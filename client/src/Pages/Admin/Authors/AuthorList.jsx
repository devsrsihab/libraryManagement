import { useContext } from "react"
import AddAuthorModal from "./AddAuthorModal"
import { ThemeContext } from "../../../Providers/ThemeChangeProvider"

const AuthorList = () => {

  const {theme} = useContext(ThemeContext)

  return (
    <div className="overflow-x-auto">
    {/* heading */}
    <div className="page-header lg:flex gap-6 items-center ">
      <h2 className={`text-xl md:text-2xl lg:text-3xl my-4 lg:my-8  ${
            theme === "light"
              ? "bg-white text-[#333333]"
              : "bg-[#1a2025] text-[#A6ADBA]"
          }  font-bold uppercase`}>
        Add  <span className="text-[#E59285]">Author</span>
        
      </h2>
      {/* The button to open modal */}
      <label htmlFor="addCategoryModalBox" className="btn">add category</label>

    </div>
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Hart Hagerty</div>
                <div className="text-sm opacity-50">United States</div>
              </div>
            </div>
          </td>
          <td>
            Zemlak, Daniel and Leannon
            <br />
            <span className="badge badge-ghost badge-sm">
              Desktop Support Technician
            </span>
          </td>
          <td>Purple</td>
          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        {/* row 2 */}
        <tr>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src="https://daisyui.com/tailwind-css-component-profile-3@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Brice Swyre</div>
                <div className="text-sm opacity-50">China</div>
              </div>
            </div>
          </td>
          <td>
            Carroll Group
            <br />
            <span className="badge badge-ghost badge-sm">Tax Accountant</span>
          </td>
          <td>Red</td>
          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        {/* row 3 */}
        <tr>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src="https://daisyui.com/tailwind-css-component-profile-4@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Marjy Ferencz</div>
                <div className="text-sm opacity-50">Russia</div>
              </div>
            </div>
          </td>
          <td>
            Rowe-Schoen
            <br />
            <span className="badge badge-ghost badge-sm">
              Office Assistant I
            </span>
          </td>
          <td>Crimson</td>
          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        {/* row 4 */}
        <tr>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src="https://daisyui.com/tailwind-css-component-profile-5@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Yancy Tear</div>
                <div className="text-sm opacity-50">Brazil</div>
              </div>
            </div>
          </td>
          <td>
            Wyman-Ledner
            <br />
            <span className="badge badge-ghost badge-sm">
              Community Outreach Specialist
            </span>
          </td>
          <td>Indigo</td>
          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
      </tbody>
      {/* foot */}
      <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
          <th></th>
        </tr>
      </tfoot>
    </table>

    {/* modal box */}
    <AddAuthorModal/>
  </div>
  )
}

export default AuthorList