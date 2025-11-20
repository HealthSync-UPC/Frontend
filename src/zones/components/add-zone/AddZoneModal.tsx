import { Modal, Snackbar } from "@mui/material";
import { AddZoneForm } from "./AddZoneForm";
import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AddZoneModal({ open, onClose }: Props) {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState('');

    return (
        <>
            <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
                <AddZoneForm onCancel={onClose} onSetMessage={setMessage} onSetOpenSnackBar={setOpenSnackBar} />
            </Modal>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackBar(false)}
                message={message}
                action={<div className="mr-3 cursor-pointer" onClick={() => setOpenSnackBar(false)}>X</div>}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
}
