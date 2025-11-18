import { Modal, Box } from "@mui/material";
import { AddZoneForm } from "./AddZoneForm";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AddZoneModal({ open, onClose }: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="bg-white rounded-2xl shadow-xl"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: 600,
                    outline: "none",
                }}
            >
                <AddZoneForm onCancel={onClose} />
            </Box>
        </Modal>
    );
}
