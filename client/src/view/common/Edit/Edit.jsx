import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Edit.scss";
import "draft-js/dist/Draft.css";
import { Card } from "@material-ui/core";

export const Edit = ({ editorState, onEditorStateChange }) => {

  return (
    <div className="edit">
      <Card className="edit__card">
        <Editor
          editorState={editorState}
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            embedded: {
              defaultSize: {
                height: "450",
                width: "800",
              },
            },
            image: {
              defaultSize: {
                height: "auto",
                width: "800",
              },
            },
          }}
        />
      </Card>

      <div className="edit__count">
        <div className="edit__count--line">
          lines:{" "}
          {
            editorState
              .getCurrentContent()
              .getPlainText("\u000A")
              .split(/\r\n|\r|\n/).length
          }
        </div>
        <div className="edit__count--line">
          words:{" "}
          {editorState
            .getCurrentContent()
            .getPlainText("\u000A")
            .match(/[^\s]+/g)
            ? editorState
                .getCurrentContent()
                .getPlainText("\u000A")
                .match(/[^\s]+/g).length
            : 0}
        </div>
      </div>
    </div>
  );
};
