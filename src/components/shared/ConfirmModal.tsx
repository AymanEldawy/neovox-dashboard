import { useTranslation } from "react-i18next";
import Btn from "./Btn";
import Modal from "./Modal";

const ConfirmModal = ({ open, onClose, onConfirm, type, msg } : {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type?: string;
  msg?: string;
}) => {
  const { t } = useTranslation(["formWarnAlerts", "translation"]);

  return (
    <Modal open={open} onClose={onClose} containerClassName="z-[103]">
      <h3 className="text-red-500 text-lg mb-2 font-semibold">
        {type ? type : "warning"}
      </h3>
      <p className="mb-6 mx-auto max-w-[90%]">
        {msg ? msg : "confirmDelete"}
      </p>
      <div className="flex gap justify-end gap-2">
        <Btn onClick={onClose} kind="default">
          {t("cancel")}
        </Btn>
        <Btn onClick={onConfirm} kind="error">
          {t("yes")}
        </Btn>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
