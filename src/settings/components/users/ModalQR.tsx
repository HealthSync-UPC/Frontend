import Modal from "@mui/material/Modal"

interface ModalQRProps {
    open: boolean;
    onClose: () => void;
    qrCode: string;
}

export function ModalQR({ open, onClose, qrCode }: ModalQRProps) {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md">
                <h2 className="text-3xl font-medium">QR Code</h2>
                <img src={qrCode} alt="QR Code" className="w-65 h-65" />
            </div>
        </Modal>
    )
}