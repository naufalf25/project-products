import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Toast = withReactContent(Swal).mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const showToast = (title, icon = "info") => {
  Toast.fire({
    title,
    icon,
  });
};

export { showToast };
