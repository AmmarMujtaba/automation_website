import { FaChartBar } from "react-icons/fa";
import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";

const Statistics = () => {
    const demoData = [
        { month: "Jan", usage: 300 },
        { month: "Feb", usage: 280 },
        { month: "Mar", usage: 320 },
        { month: "Apr", usage: 250 },
      ];
return (
<div className="statistics-section">
            <FaChartBar className="stats-icon" />
            <h2>Usage Statistics</h2>
            <p>Monitor your electricity usage over time.</p>

            {/* Graphs Container */}
            <div className="graph-container">
           

              {/* Bar Chart */}
              <ResponsiveContainer width="190%" height={350}>
                <BarChart data={demoData}>
                  <XAxis dataKey="month"
                   label={{
                       value: "Months",
                       angle: 360,    
                       position: "center", 
                       offset: 10,   
                       fontSize: 17,
                       fontWeight: "bold",       
                     }} />
                  <YAxis  label={{
                      value: "Units",    
                      angle: -90,           
                      position: "insideLeft",
                      offset: 10,   
                        fontSize: 17,
                       fontWeight: "bold",             
                     
                    }}/>
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <Bar dataKey="usage" fill="#ff7043" />
                </BarChart>
              </ResponsiveContainer>

            </div>
          </div>
)
}
export default Statistics;