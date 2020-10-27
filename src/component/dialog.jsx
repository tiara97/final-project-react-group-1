import React from "react"
import{ Dialog,
        DialogActions, 
        DialogContent, 
        DialogTitle} from "@material-ui/core" 

const DialogComp = ({open, onClose, text, action, title }) =>{
    return(
        <Dialog 
        open={open}
        onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
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