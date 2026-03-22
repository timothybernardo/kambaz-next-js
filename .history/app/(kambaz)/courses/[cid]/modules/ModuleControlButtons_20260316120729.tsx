"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="float-end">
      {isFaculty && (
        <>
          <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
          <FaTrash onClick={() => deleteModule(moduleId)} className="text-danger me-2" />
        </>
      )}
      <GreenCheckmark />
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}