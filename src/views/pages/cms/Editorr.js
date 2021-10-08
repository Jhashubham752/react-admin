// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DOMPurify from "dompurify";

// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// // import { convertToHTML } from "draft-convert";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./Editior.css";

// import Header from "../../Layouts/Header";
// import Sidebar from "../../Layouts/Sidebar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Editorr = () => {
//   const editor = React.useRef(null);
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );

//   const [html, setHtml] = useState("");

//   // const [editorState, setEditorState] = useState('initialState');
//   const [convertedContent, setConvertedContent] = useState(null);

//   const handleEditorChange = (editorState) => {
//     console.log(editor.current);
//     setEditorState(editorState);

//     setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));

//     // let _contentState = ContentState.createFromText("Sample content state");

//     // console.log("EDITOR STATE", convertToRaw(_contentState));
//   };

//   console.log(editorState.getCurrentContent().getPlainText());
//   // let _contentState = EditorState.createFromText(data);
//   // const raw = convertToHTML(_contentState);
//   // const [contentState, setContentState] = useState(raw);

//   // const convertContentToHTML = () => {
//   //   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
//   //   setConvertedContent(currentContentAsHTML);
//   // };

//   const createMarkup = (html) => {
//     return {
//       __html: DOMPurify.sanitize(html),
//     };
//   };

//   const aboutUs = () => {
//     try {
//       axios
//         .get("http://localhost:5050/getcontactus/614dc13a4cd40c91eb09d5f1")
//         .then((res) => {
//           console.log(res, "========>res inside about us");

//           // setEditorState(EditorState.createWithContent("fsf"));
//           // console.log(EditorState);
//           // const editorState = EditorState.createWithContent("fghdg");
//           // console.log("editorState", editorState);

//           console.log(res.data.discription, "res.data.description");

//           const contentBlock = htmlToDraft(res.data.discription);
//           if (contentBlock) {
//             const contentState = ContentState.createFromBlockArray(
//               contentBlock.contentBlocks
//             );
//             const editorState = EditorState.createWithContent(contentState);

//             setEditorState(editorState);
//           }
//         });
//     } catch (err) {
//       console.log(err.response);
//     }
//   };

//   const submitUpdateHtml = async () => {
//     await axios
//       .put("http://localhost:5050/updateabout/614dc13a4cd40c91eb09d5f1")
//       .then((res) => {
//         console.log(res);
//         toast.success(res.data);
//       });
//     console.log(html, "===========>html");
//   };

//   // useEffect(() => {
//   //   aboutUs();
//   // }, []);

//   return (
//     <>
//       <Header />
//       <Sidebar />
//       <div className="content-wrapper">
//         <div className="style">
//           <button type="submit" class="btn btn-success" onClick={aboutUs}>
//             About Us
//           </button>
//           <button type="submit" class="btn btn-primary">
//             Contact Us
//           </button>
//           <button type="submit" class="btn btn-danger">
//             Terms and Conditions
//           </button>
//         </div>
//         <Editor
//           ref={editor}
//           editorState={editorState}
//           onEditorStateChange={(editorStateValue) =>
//             handleEditorChange(editorStateValue)
//           }
//           wrapperClassName="wrapper-class"
//           editorClassName="editor-class"
//           toolbarClassName="toolbar-class"
//         />
//         <div
//           className="preview"
//           dangerouslySetInnerHTML={createMarkup(convertedContent)}
//         ></div>

//         <button
//           type="submit"
//           class="btnn pull-right"
//           onClick={submitUpdateHtml}
//         >
//           Update
//         </button>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };
// export default Editorr;
