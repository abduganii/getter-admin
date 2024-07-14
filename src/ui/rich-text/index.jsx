import { useEffect } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
// import 'froala-editor/js/plugins/image.min.js';
import { _convertHtmlToPlainText } from "../../utils/htmlToPlainText";
// import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import { UploadFile } from "../../../../services/file";
import axios from "axios";
// import api from "../../../../services/api";

const config = (placeholder, formik, btn) => ({
  enter: Froalaeditor.ENTER_BR,
  toolbarInline: true,
  placeholderText: placeholder,
  //   charCounterCount: false,
  toolbarVisibleWithoutSelection: true,
  imageAllowedTypes: ["jpeg", "jpg", "png"],
  toolbarButtons: {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "fontSize",
        "textColor",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
        "clearFormatting"
      ]
    },
    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "formatOLSimple",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote"
      ]
    },
    moreRich: {
      buttons: btn
      // [
      //     "insertLink",
      // "insertImage",
      //  "emoticons",
      //  "insertTable",
      //  "fontAwesome",
      //  "specialCharacters",
      //  "embedly",
      //  "insertHR",
      // ],
    },
    moreMisc: {
      buttons: [
        "undo",
        "redo",
        "fullscreen",
        "print",
        "getPDF",
        "spellChecker",
        "selectAll",
        "html",
        "help"
      ],
      align: "right",
      buttonsVisible: 2
    }
  },
  events: {
    initialized: function () {
      replyEditor = this;
    },
    blur: () => {
      // console.log(replyEditor.html.get(true));
    },
    "image.beforeUpload": function (e) {
      toast.promise(
        new Promise((resolve, reject) => {
          try {
            UploadFile({ file: e[0] }).then((res) => {
              if (res.data) {
                replyEditor.image.insert(
                  String(res?.data),
                  false,
                  null,
                  replyEditor.image.get()
                );
                resolve("");
              } else {
                reject("");
              }
            });
          } catch (error) {
            reject(error);
          }
        }),
        {
          loading: "Идёт загрузка картинки...",
          success: "Картинка успешно загружена",
          error: "Что-то пошло не так во время загрузки картинки"
        }
      );
    },
    "image.inserted": function (img) {
      //   const values = getValues();
      //   let descImg = values?.descImg || [];
      //   descImg?.push(img?.[0]?.src);
      //   setValue(`descImg`, descImg);
    },
    "image.removed": (img) => {
      //   const values = getValues();
      //   let descImg = values?.descImg || [];
      //   descImg = descImg?.filter((e) => e !== img?.[0]?.currentSrc);
      //   setValue(`descImg`, descImg);
      //   axios.delete(
      //     "https://grm-upload.getter.uz/remove",
      //     { data: { url: img[0]?.currentSrc } },
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         "Access-Control-Allow-Origin": "*",
      //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      //       }
      //     }
      //   );
    },
    "image.error": () => {},
    "paste.beforeCleanup": function (html) {
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const elements = temp.querySelectorAll(
        "p, h1, h2, h3, h4, h5, h6, span, div, li, ul"
      );
      elements.forEach((el) => {
        el.removeAttribute("style");
      });
      return temp.innerHTML;
    }
  }
});

let replyEditor = "";
let locale = "";

const RichText = ({
  register,
  title,

  formik,
  value = "",
  name = "",
  placeholder,
  onChange = () => {}
}) => {
  useEffect(() => {
    // if (import.meta.env.PROD) {
    // import('./removeLisence.css')
    // }
  }, []);
  locale = name?.split(".")?.[0];

  const btn = title
    ? [""]
    : [
        "insertImage",
        "emoticons",
        "insertTable",
        "fontAwesome",
        "specialCharacters",
        "embedly",
        "insertHR"
      ];
  return (
    <>
      <FroalaEditor
        model={value}
        onModelChange={(model) => {
          onChange(model);
          formik.setFieldValue(name, model);
        }}
        config={config(placeholder, formik, btn)}
        {...register}
      />
    </>
  );
};

export default RichText;
