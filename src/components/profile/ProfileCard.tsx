import { type TPopulatedProfile } from "~/server/api/types";
import { formatAddress } from "~/util";
import moment from "moment";

export const ProfileCard = ({ profile }: { profile: TPopulatedProfile }) => {
  return (
    <div className="max-w-sm overflow-hidden rounded bg-white p-4 shadow-lg">
      <img
        className="h-48 w-full object-cover"
        src={profile.photoUrl}
        alt={`${profile.familyName}'s photo`}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{profile.title}</div>
        <p className="text-base text-gray-700">{profile.description}</p>
      </div>
      <div className="px-6 pb-2 pt-4">
        <p>
          <strong>Family Name:</strong> {profile.familyName}
        </p>
        <p>
          <strong>Age</strong>{" "}
          {moment().diff(moment(profile.dateOfBirth), "years")}
        </p>
        <p>
          <strong>Maximum People:</strong> {profile.maximumPeople}
        </p>
        <p>
          <strong>Smoking Allowed:</strong> {profile.isSmoking ? "Yes" : "No"}
        </p>
        <p>
          <strong>Neighbourhood:</strong> {profile.neighbourhood}
        </p>
        <p>
          <strong>Status:</strong> {profile.status}
        </p>
      </div>
      {profile.address && (
        <div className="px-6 pb-2 pt-4">
          <p>
            <strong>Address:</strong> {formatAddress(profile.address)}
          </p>
        </div>
      )}
      <div className="px-6 pb-2 pt-4">
        <strong>Languages:</strong>
        <ul>
          {profile.profileLanguages.map((lang) => (
            <li key={lang.languageId}>{lang.language.name}</li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-2 pt-4">
        <strong>Drinks:</strong>
        <ul>
          {profile.profileDrinks.map((drink) => (
            <li key={drink.drinkId}>{drink.drink.name}</li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-2 pt-4">
        <strong>Food Types:</strong>
        <ul>
          {profile.profileFoodTypes.map((foodType) => (
            <li key={foodType.foodTypeId}>{foodType.foodType.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
