import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'


export function showError(errorMessage) {
  swal({
    title: 'Error!',
    text: errorMessage,
    type: 'error',
    confirmButtonText: 'OK'
  })
}
