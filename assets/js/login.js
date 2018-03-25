$(document).ready(function(){

	// AIzaSyBTnEq7wfAfQhyEtkxSBX0al23j05x-Fs0
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDGB7XUtCBHNdqIvgqcE4D_lxZ8v6ZwzQU",
		authDomain: "mindful-87015.firebaseapp.com",
		databaseURL: "https://mindful-87015.firebaseio.com",
		projectId: "mindful-87015",
		storageBucket: "",
		messagingSenderId: "716704348602"
	};
	firebase.initializeApp(config);

	var database = firebase.database();

	// ------------------------------
	// Handle Sign In / Sign Out
	// ------------------------------

	var siteuser = null;

	/* Sign-on Information */
	$("#sign-in").on("click", function(event) {
		event.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();

		// Display Google Sign in Window
		firebase.auth().signInWithPopup(provider).then(function(result) {
			console.log('sign in successful');
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			siteuser = result.user;
			console.log(siteuser);

			// Change image
			$("#user-pic").css('background-image', 'url(' + siteuser.photoURL + ')');
			$("#user-name").text(siteuser.displayName);
			$("#user-name").attr('hidden', false);
			$("#sign-in").attr('hidden', true);
			$("#sign-out").attr('hidden', false);

			// database.ref().update(user.uid);

			database.ref().push({
				user: JSON.stringify(siteuser)
			});
			console.log('sign in');
		}).catch(function(error) {
			console.log('Google sign in failed');
			console.log(error);

			// Sign in Anonymously 
			// firebase.auth().signInAnonymously();
			// firebase.auth().onAuthStateChanged(function(user) {
			// 	if (user) {
			// 		// User is signed in.
			// 		var isAnonymous = user.isAnonymous;
			// 		var uid = user.uid;
			// 		console.log('Anon Sign in successful ' + uid);
			// 	}
			// });
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
		// ...
		});
	});

	$("#sign-out").on('click', function(event) {
		event.preventDefault();

		firebase.auth().signOut().then(function(){
			console.log('sign out successful');
			$("#user-pic").css('background-image', 'url(assets/images/profile_placeholder.png)');
			$("#user-name").text('');
			$("#user-name").attr('hidden', true);
			$("#sign-in").attr('hidden', false);
			$("#sign-out").attr('hidden', true);
		}).catch(function(error){
			console.log('sign out failed');
		});
	});

	database.ref().on('value', function(snapshot) {
		console.log(snapshot.val().key);
	});


});