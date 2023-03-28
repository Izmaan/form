const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");

fileInput.addEventListener("change", function() {
    for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const reader = new FileReader();

        reader.addEventListener("load", function() {
            const img = document.createElement("img");
            img.src = this.result;
            imagePreview.appendChild(img);
        });

        reader.readAsDataURL(file);
    }
});



// Initialize Firebase
var config = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    databaseURL: "your_database_url",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id"
  };
  firebase.initializeApp(config);
  
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  
  // Get a reference to the file element
  var file = document.getElementById('file-input').files[0];
  
  // Create a reference to the image file in Firebase Storage
  var storageRef = storage.ref('images/' + file.name);
  
  // Upload the image file to Firebase Storage
  var task = storageRef.put(file);
  
  // Listen for state changes, errors, and completion of the upload
  task.on('state_changed',
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + percentage + '% done');
    },
    function error(err) {
      console.log('Upload error:', err);
    },
    function complete() {
      console.log('Upload complete');
    }
  );
  