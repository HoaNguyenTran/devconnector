import { Dialog, Divider, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

import React from "react";
import img from "../../../assets/images/auth/rainbowdev.jpg";
import ButtonCommon from "../Button/ButtonCommon";

const Img = styled.img`
  width: 100px;
  transform: rotate(-15deg);
  margin: 1rem 1rem 2.5rem;
`;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogCommon = ({ isShowing, hide }) =>
  isShowing && (
    <Dialog
      onClose={hide}
      aria-labelledby="customized-dialog-title"
      open={isShowing}
    >
      <DialogTitle id="customized-dialog-title" onClose={hide}>
        Log in to continue
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Img src={img} alt="" />
        <Typography component="h1" gutterBottom>
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </Typography>
        <ButtonCommon />
      </DialogContent>
      <DialogContent dividers>
        <Typography gutterBottom>
          We strive for transparency and don't collect excess data.
        </Typography>
      </DialogContent>
    </Dialog>
  );
export default DialogCommon;
