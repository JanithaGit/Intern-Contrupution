import swal from "sweetalert2";
import "../Components/Spinner/Spinner.css";

export class SwalUtil {

  static closeSwal() {
    swal.close();
  }

  static showLoadingSwal() {
    swal.fire({
      html: '<div class="loader">Loading...</div>',
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

  static showErrorSwal(msg) {
    swal.fire({
      title: 'Error!',
      text: msg,
      type: 'error'
    });
  }

}
