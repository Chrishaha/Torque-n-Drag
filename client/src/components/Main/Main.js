import React, {Component} from "react";
import "./Main.css";

class Main extends Component {
    render(){ 
        return(<div>
        <section class="banner">
        <div className="container pt-5">
			<div className="col col-6 pt-5">	
				 <h1 id="taglineBlock">Access your wells data. Anywhere. Anytime.
				 </h1>
			</div>
		</div>
        </section>
        <section className="mobile-tagline container mb-2">
            <h1 className="text-center">Access your wells data. Anywhere. Anytime.
            </h1>
       </section>
       

    <section className="space container mb-2">
        <div className="mxn2">
            <div className="mx-auto px-3 text-center">
                <h2>Want to have better handle of your casing string?</h2>
            
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                 <button type="button" className="btn btn-primary">Log In</button>
                 <button type="button" className="btn btn-success">Sign Up</button>
            </div>
        </div>
    </section>
   </div>
   );

        }
    }

export default Main;