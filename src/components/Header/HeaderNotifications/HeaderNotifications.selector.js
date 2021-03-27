const selector = state => ({
  notifications: state.user.notifications,
  loading: state.user.isNotificationsLoading
})

export default selector;