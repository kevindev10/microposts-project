
class UI {
  constructor(){
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

// Show all posts
 showPosts (posts){

  let output = '';

  posts.forEach(function(post){

    output +=`
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>

          <a href="#" class="delete card-link" data-id="${post.id}">
          <i class="fa fa-remove"></i>
        </a>
        </div>
      </div>
    `
    
  })

  this.post.innerHTML = output;

 }

// Clear all fields
clearFields(){
  document.querySelector('#title').value = '';
  document.querySelector('#body').value = '';
}
 
// Show alert message
showAlert(message, classname){

    this.clearAlert();   

    const div = document.createElement('div');

    div.className = classname;
    
    div.appendChild(document.createTextNode(message));

const container = document.querySelector('.postsContainer');
const posts = document.querySelector('#posts')
container.insertBefore(div, posts);

    // Timeout
setTimeout(() =>{
  this.clearAlert();
}, 2000);

}
 
 // Clear alert message
clearAlert(){
 
  const currentAlert = document.querySelector('.alert');

  if(currentAlert){
   currentAlert.remove();
 }

}



fillForm(data){
 
  // Fill form
  this.titleInput.value = data.title;
  this.bodyInput.value= data.post;
  this.idInput.value = data.id;

 // Change to edit state 
 this.changeFormState('edit')


}
 
// Remove Id hidden value
  clearID(){
    this.idInput.value='';
  }


 // Change the form state
changeFormState(type){
  if(type==='edit'){
    
    // Change post it button to update button
    this.postSubmit.className = 'post-submit btn btn-warning btn-block';
    this.postSubmit.textContent = 'Update Post';

    // Add/Create a cancel edit button
    const button = document.createElement('button');
    button.className= 'post-cancel btn btn-light btn-block';
    button.appendChild(document.createTextNode('Cancel Edit'));

    // Add cancel edit button to UI

    const card = document.querySelector('.card');
    const formEnd = document.querySelector('.form-end');

    card.insertBefore(button, formEnd);

  }else{

     // Change update button to back to post it button
     this.postSubmit.className = 'post-submit btn btn-primary btn-block';
     this.postSubmit.textContent = 'Post It';
    
     // Clear input fields
     this.clearFields();

     // Remove id from hidden field
     this.clearID();

     // Remove cancel edit button if its there
     if(document.querySelector('.post-cancel')){
      document.querySelector('.post-cancel').remove();
     }



  }
}





}


export const ui = new UI();