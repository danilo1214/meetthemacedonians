"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { TPopulatedProfile, TPopulatedReservation } from "~/server/api/types";
import { env } from "~/env";

type ReservationConfirmationProps = {
  reservation: TPopulatedReservation;
};

export const ReservationConfirmed = ({
  reservation,
}: ReservationConfirmationProps) => {
  const { profile } = reservation;

  const qrValue = `reservation:${reservation.id}`;

  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src={profile.photoUrl}
          alt={profile.title}
          className="h-16 w-16 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-primary-600">
            Reservation Confirmation
          </h2>
          <p className="text-muted-500">{profile.title}</p>
          <p className="text-sm text-muted-500">{profile.address}</p>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="grid grid-cols-2 gap-4 rounded-xl bg-background-100 p-4 text-sm">
        <div>
          <p className="text-muted-500">From</p>
          <p className="font-medium">
            {new Date(reservation.dateFrom).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-muted-500">To</p>
          <p className="font-medium">
            {new Date(reservation.dateTo).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-muted-500">Bags</p>
          <p className="font-medium">{reservation.bags}</p>
        </div>
        <div>
          <p className="text-muted-500">Contact</p>
          <p className="font-medium">{reservation.phoneNumber}</p>
          <p className="font-medium">{reservation.email}</p>
        </div>
      </div>

      {/* Map */}
      <div className="h-64 w-full overflow-hidden rounded-xl">
        <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={{ lat: profile.lat, lng: profile.lng }}
            defaultZoom={15}
            mapId="reservation-map"
            style={{ width: "100%", height: "100%" }}
          >
            <Marker position={{ lat: profile.lat, lng: profile.lng }} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};
