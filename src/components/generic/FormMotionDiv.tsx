import { motion } from "framer-motion";

interface FormMotionDivProps {
  title: string;
  description: string;
  delta: number;
  children: React.ReactElement | React.ReactElement[];
}

export const FormMotionDiv = ({
  delta,
  children,
  title,
  description,
}: FormMotionDivProps) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="my-8 text-center">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      </div>

      {children}
    </motion.div>
  );
};
