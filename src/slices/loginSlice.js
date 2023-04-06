import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const userLogin = createAsyncThunk('login/userLogin',async(userCredObj,{rejectWithValue})=>{
    try{
    let res = await axios.post("http://localhost:9999/specialUsers-api/special-user-login",userCredObj)
    console.log("login slice",res)
    // store token in local/session storage
    if(res.data.Message==="Login Successful")
    {
        sessionStorage.setItem("token",res.data.token);
        sessionStorage.setItem("status","Login Successful");
        sessionStorage.setItem("user",JSON.stringify(res.data.user));
        return res.data;
    }
    else{
        throw new Error(res.data.message);
    }
    }catch(err){
        return rejectWithValue(err);
    }
})

let user = sessionStorage.getItem("user");
if(user){
    user = JSON.parse(user)
}
else{
    user = {}
}

let status = sessionStorage.getItem("status");
if(!status){
    status = "idle";
}
export const loginSlice = createSlice({
    name: "login",
    initialState: {
        userObj:user,
        userLoginStatus:false,
        errorMessage:"",
        status:status
    },
    reducers: {
        clearState:(state)=>{
            state.status="idle";
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.status='pending'
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.userObj = action.payload.user;
            state.userLoginStatus = true;
            state.errorMessage="";
            state.status='Login Successful'
        });
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage = action.payload.message;
            state.userLoginStatus = false;
            state.status='failed'
        });
    }
  });

  // create action creator functions
export const {clearState} =
loginSlice.actions;

// export all reducers as a single reducer object
export default loginSlice.reducer;