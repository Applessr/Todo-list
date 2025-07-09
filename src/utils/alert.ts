import Swal from 'sweetalert2'

export const showSuccessAlert = async (message: string) => {
    await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        width: 'auto', 
        padding: '1em', 
    });
}

export const showDeleteConfirm = async (onConfirm: () => void) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
            popup: 'swal2-mobile',
            confirmButton: 'swal2-confirm-button',
            cancelButton: 'swal2-cancel-button'
        }
    });

    if (result.isConfirmed) {
        await Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
            customClass: { popup: 'swal2-mobile' },
        });
        onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        await Swal.fire({
            title: "Cancelled",
            text: "Your task is safe :)",
            icon: "error",
            customClass: { popup: 'swal2-mobile' },
        });
    }
};

