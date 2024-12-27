import { useDispatch} from "react-redux";
import { setIsModalOpen, setModal } from "../app/slices/modalSlice";

const useModal = () => {
  const dispatch = useDispatch();

  const openModal = (modalName, data = null) =>
    dispatch(setModal({ name: modalName, data }));

  const closeModal = () => {
    dispatch(setIsModalOpen(false));
  };

  return {
    openModal,
    closeModal,
  };
};

export default useModal;

