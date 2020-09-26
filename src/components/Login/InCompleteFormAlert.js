
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
