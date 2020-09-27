import React from "react"
import{ Dialog,
        DialogActions, 
        DialogContent, 
        DialogContentText} from "@material-ui/core" 

const DialogComp = ({open, onClose, text, action }) =>{
    return(
        <Dialog 
        open={open}
        onClose={onClose}>
        <DialogContent>
                {text}
        </DialogContent>
        <DialogActions>
            {action}
        </DialogActions>
    </Dialog>
    )
}

export default DialogComp