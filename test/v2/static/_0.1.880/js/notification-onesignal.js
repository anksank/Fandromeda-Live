var OneSignal = OneSignal || [];
OneSignal.push(["init", {
    appId: "460f9815-78c4-4e29-afab-3ff37550ed63",
    safari_web_id: 'web.onesignal.auto.002ea938-3ebd-4740-ada1-6c17c5eb4600',
    path: '/',
    autoRegister: true,
    showCredit: false,
    welcomeNotification: { disable: true },
    notifyButton: {
        enable: false,
    }
}]);

OneSignal.push(function() {
    OneSignal.sendTags({hostname: window.location.hostname});
});