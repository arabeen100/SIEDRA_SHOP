import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface SideBarState {
  expanded: boolean;
  enabled:boolean,
  completeChange:boolean,
  range:number[],
}
const initialState:SideBarState={
    expanded:false,
    enabled:false,
    completeChange:false,
    range:[0,0]
}
const sideBarSlice=createSlice({
    name:"Sidebar",
    initialState,
    reducers:{
        toggleExpanded:(state)=>{
            state.expanded=!state.expanded;
        },
          setEnabled:(state,{payload}:PayloadAction<boolean>)=>{
            state.enabled=payload;
        },
             setCompleteChange:(state,{payload}:PayloadAction<boolean>)=>{
            state.completeChange=payload;
        },
               setRange:(state,{payload}:PayloadAction<number[]>)=>{
            state.range=payload;
        },
    }

})
export default sideBarSlice.reducer;
export const { toggleExpanded,setEnabled,setCompleteChange,setRange } = sideBarSlice.actions;