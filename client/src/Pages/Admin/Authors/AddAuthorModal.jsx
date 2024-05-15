const AddAuthorModal = () => {
  return (
    <>
    {/* Put this part before </body> tag */}
    <input type="checkbox" id="addCategoryModalBox" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="modal-action">
            <label htmlFor="addCategoryModalBox" className="btn">
              Close!
            </label>
            <button className="btn text-white hover:bg-primary bg-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default AddAuthorModal