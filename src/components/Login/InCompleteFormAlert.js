import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function InCompleteFormAlert({
    open,
    setOpen
}) {
    return <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle>
            Form is not fullfilled
                    </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                May be you didn't fill in some field
                        </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={() => setOpen(false)} autoFocus>
                Okay
                        </Button>
        </DialogActions>
    </Dialog>;
}
