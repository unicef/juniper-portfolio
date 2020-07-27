import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function ArchiveTxIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M14.286 2H1.714C.768 2.001.001 2.768 0 3.714v8c.001.947.768 1.714 1.714 1.715h12.572c.946-.001 1.713-.768 1.714-1.715v-8c-.001-.946-.768-1.713-1.714-1.714zm-.687 1.143L8 7.019 2.4 3.143h11.2zm1.258 8.571c0 .316-.256.571-.571.572H1.714c-.315 0-.57-.256-.571-.572v-8c0-.016.008-.03.01-.045l6.522 4.515c.195.135.455.135.65 0l6.523-4.515c.001.015.01.029.01.045v8z"
      />
    </SvgIcon>
  );
}
