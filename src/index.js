import './styles.css';

import { http } from './http';
import {ui} from './ui';


// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost );

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit );

// Listen for cancel
document.querySelector('.card').addEventListener('click', cancelEdit )





// Get posts 
function getPosts(e){


  http.get('http://localhost:3001/posts')
  .then(data => {
    ui.showPosts(data)
  })
  .catch(err => console.log(err))


}




// Submit Post
function submitPost(e){

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  
  const data = {
    title: title,
    body:body
  }

  // Validate input
  if(title !=='' && body !==''){
    
     // Check for ID
    if(id===''){

        // Create Post
        http.post('http://localhost:3001/posts', data)
        .then(data => {
          
          ui.showAlert('Post added', 'alert alert-success')
          ui.clearFields();
          getPosts();
          
              
        })
      
        .catch(err => err)


    }else{

        // Update Post
        http.put(`http://localhost:3001/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post Updated', 'alert alert-success')
          ui.changeFormState('add')
          getPosts();
          
              
        })
      
        .catch(err => err)


    }
  
  
  }else{
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  }

  //e.preventDefault();
  }
 





  // Delete post 

  function deletePost (e){
    
    if(e.target.parentElement.classList.contains('delete')){
      const id = parseInt( e.target.parentElement.getAttribute("data-id"));
     

      if(confirm('Are you sure you want to delete?')){
        http.delete(`http://localhost:3001/posts/${id}`)
        .then(msg => {

          
          ui.showAlert(msg, 'alert alert-danger' )
          getPosts();
        })
        .catch(err => console.log(err))
       
      }

     
    }
     
    e.preventDefault();
  }








// Enable edit state

function enableEdit (e){

 if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const post =e.target.parentElement.previousElementSibling.textContent;
    

    const data = {
      id : id,
      title:title,
      post: post
    }

    // Fill form with current post
    ui.fillForm(data)

 }


  e.preventDefault();
}






// Cancel edit state

function cancelEdit(e){


  if(e.target.classList.contains('post-cancel')){

    ui.changeFormState('add')
  }
  e.preventDefault();

}