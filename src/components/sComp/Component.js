export default function Component(props){
    return(
      <>
          <div className="row mt-3">
              <div className="col">
                  <div className="card">
                      <div className="card-header">
                          {props.title}
                      </div>
                      <div className="card-body">
                          <h5 className="card-title">{props.subtitle}</h5>
                          <p className="card-text">{props.des}</p>
                          <button type="button" className="btn btn-primary"
                                   onClick={props.func}>
                              {props.btnName}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
}
