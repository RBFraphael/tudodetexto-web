import React from "react";
import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function Alert(options: SweetAlertOptions) {
    let alertOptions = {
        buttonsStyling: false,
        ...options
    }

    alertOptions.customClass = {
        cancelButton: "btn btn-danger",
        confirmButton: "btn btn-primary",
        closeButton: "btn btn-secondary",
        actions: "d-flex justify-content-center gap-2",
        popup: "shadow-sm",
        htmlContainer: "p-3",
        ...(
            typeof options.customClass === "object" ? options.customClass : {}
        )
    };

    if (alertOptions.html && React.isValidElement(alertOptions.html)) {
        return withReactContent(Swal).fire(alertOptions);
    }

    return Swal.fire(alertOptions);
}