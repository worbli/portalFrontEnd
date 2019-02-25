import {createMixin} from 'polymer-redux';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';


const ReduxMixin = createMixin(store);
class WbiApi extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
    };
  }


 /**
 * Join Worbli
 * @param {string} email - guests email address
 * @param {string} password - guests password
 * @param {boolean} agreedTerms - agreement of the terms and conditions
 * @param {boolean} agreedMarketing - agreed to recieve marketing materials
 */
  join(email, password, agreedTerms, agreedMarketing) {
    const url = `${this.env.apiUrl}/visitor/join/`;
    const data = {email, password, agreedTerms, agreedMarketing};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }


  /**
 * SignIn to Worbli
 * @param {string} email - guests email address
 * @param {string} password - guests password
 */
  signIn(email, password) {
    const url = `${this.env.apiUrl}/user/login/`;
    const data = {email, password};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  /**
 * Guests has forgotten password
 * @param {email} email - guests email address
 */
  forgotPassword(email) {
    const url = `${this.env.apiUrl}/visitor/reset/`;
    const data = {email};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

/**
 * Upload an image
 * @param {file} file - file blob
 * @param {string} fileType - tyoe of file 'passport-front'
 */
  uploadImage(file, fileType) {
    const token = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append(fileType, file);
    const url = `${this.env.apiUrl}/kyc/image/`;
    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

/**
 * Get an image
 * @param {string} fileType - tyoe of file 'passport-front'
 */
  getImage(fileType) {
    const token = localStorage.getItem('jwt');
    const url = `${this.env.apiUrl}/kyc/img/`;
    fetch(url, {
      method: 'GET',
      body: fileType,
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  /**
 * Get an image
 * @param {string} country - guests country
 * @param {string} nameFirst - guests first name
 * @param {string} nameLast - guests last name
 * @param {string} dob - guests date of birth
 * @param {string} gender - guests gender
 */
  kycApplication(country, nameFirst, nameLast, dob, gender) {
    const token = localStorage.getItem('jwt');
    const data = {country, nameFirst, nameLast, dob, gender};
    const url = `${this.env.apiUrl}/kyc/application/`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      mode: state.mode,
      color: state.color,
      env: state.env,
    };
  }
} window.customElements.define('wbi-api', WbiApi);
