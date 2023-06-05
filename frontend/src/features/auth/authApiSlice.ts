
import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";


const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //login user
    login: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: (loginInfo) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginInfo,
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
    }),
    //verify email
    confirmEmail: builder.mutation<{ message: string }, string>({
      query: (emailToken) => ({
        url: `/auth/verify/${emailToken}`,
        method: "POST",
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
    }),
    //forgot pwd request
    forgotPwd: builder.mutation<{ message: string }, { email: string }>({
      query: ({ email }) => ({
        url: `/auth/forgot`,
        method: "POST",
        body: { email },
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
    }),
    //reset password
    resetPwd: builder.mutation<
      { message: string },
      { resetPwdToken: string; password: string }
    >({
      query: ({ resetPwdToken, password }) => ({
        url: `/auth/reset/${resetPwdToken}`,
        method: "POST",
        body: { password },
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
    }),
    //logout
    sendLogout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState()); //when store is being removed from memory, reset to clean any rogue timers//avoid memory leaks
          }, 1000);
        } catch (err) {
          //console.log(err);
        }
      },
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
    }),
    //refresh token//persist on page reload or remember me
    refresh: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials(accessToken));
        } catch (err) {
          // console.log(err);
        }
      },
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useSendLogoutMutation,
  useRefreshMutation,
  useResetPwdMutation,
  useForgotPwdMutation,
  useConfirmEmailMutation,
  useLoginMutation,
} = authApiSlice;
