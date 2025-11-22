import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({firstName:'', lastName:'', email:'', password:''});
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handle = async (e) => {
    e.preventDefault();
    try {
      await register(form.firstName, form.lastName, form.email, form.password);
      // Optionally auto-login or redirect to login
      nav('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" style={{width: '120%', maxWidth: 'none'}} />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" style={{width: '120%', maxWidth: 'none'}} />
      </div>
      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" style={{width: '120%', maxWidth: 'none'}} />
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" style={{width: '120%', maxWidth: 'none'}} />
      </div>
      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" style={{width: '120%', maxWidth: 'none'}} />
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" style={{width: '120%', maxWidth: 'none'}} />
      </div>
      <div className="_social_registration_wrap">
        <div className="container-fluid">
          <div className="row min-vh-100 align-items-center justify-content-center">
            {/* Illustration left, form right */}
            <div className="d-none d-xl-flex col-xl-6 justify-content-center align-items-center">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <img src="/assets/images/registration.png" alt="Image" />
                </div>
                <div className="_social_registration_right_image_dark">
                  <img src="/assets/images/registration1.png" alt="Image" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
              <div className="_social_registration_content w-100" style={{ maxWidth: 420, margin: '0 auto' }}>
                <div className="_social_registration_right_logo _mar_b28">
                  <img src="/assets/images/logo.svg" alt="Image" className="_right_logo" />
                </div>
                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                <button type="button" className="_social_registration_content_btn _mar_b40">
                  <img src="/assets/images/google.svg" alt="Image" className="_google_img" /> <span>Register with google</span>
                </button>
                <div className="_social_registration_content_bottom_txt _mar_b40"> <span>Or</span></div>
                <form className="_social_registration_form" onSubmit={handle}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">First Name</label>
                        <input name="firstName" className="form-control _social_registration_input" value={form.firstName} onChange={onChange} placeholder="First name" required />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Last Name</label>
                        <input name="lastName" className="form-control _social_registration_input" value={form.lastName} onChange={onChange} placeholder="Last name" required />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Email</label>
                        <input name="email" type="email" className="form-control _social_registration_input" value={form.email} onChange={onChange} placeholder="Email" required />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Password</label>
                        <input name="password" type="password" className="form-control _social_registration_input" value={form.password} onChange={onChange} placeholder="Password" required />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Repeat Password</label>
                        <input name="repeatPassword" type="password" className="form-control _social_registration_input" value={form.repeatPassword || ''} onChange={onChange} placeholder="Repeat Password" required />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                      <div className="form-check _social_registration_form_check">
                        <input className="form-check-input _social_registration_form_check_input" type="checkbox" id="terms" required />
                        <label className="form-check-label _social_registration_form_check_label" htmlFor="terms">I agree to terms & conditions</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button type="submit" className="_social_registration_form_btn_link _btn1">Register now</button>
                      </div>
                    </div>
                  </div>
                  {error && <div className="error">{error}</div>}
                </form>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">Already have an account? <a href="/login">Login</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
