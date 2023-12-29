import {useState} from "react"
import {useRef} from "react"
import {useEffect} from "react"

const BackpackForm = () => {
    const[backpackNumber, setBackpackNumber] = useState(0)
    const[backpackType, setBackpackType] = useState('')
    const[backpackGear, setBackpackGear] = useState([])
    const[backpackBought, setBackpackBought] = useState('')
    const[elements, setElements] = useState([])
    const [selectedElements, setSelectedElements] = useState([])
    

    const radioFirstRef = useRef(null);
    const radioSecondRef = useRef(null);
    const radioThirdRef = useRef(null);
    const radioFourthRef = useRef(null);

    const handleTypeChange = (e) => {
        setBackpackType(e.target.value);
    };

    const fetchElements = async () => {
        try {
            const response = await fetch('/catalog/gearInstances'); // Replace with your actual API call
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json(); // Parse response body as JSON
            setElements(data || []); // Set the fetched data to the state
        } catch (error) {
            console.error('Error fetching elements:', error);
        }
    };

    // Fetch data from MongoDB on component mount
    useEffect(() => {
        fetchElements();
    }, []);

    return (
        <form className='create'>
            <h3>Add a new Backpack</h3>
            <label>Backpack Number</label>
            <input 
                type="number"
                onChange={(e) => setBackpackNumber(e.target.value)}
                value={backpackNumber}
            />
            
            <label>
                <input 
                    ref={radioFirstRef}
                    type='radio' 
                    name='backpackType' 
                    value='backpacking'
                    checked={backpackType === 'backpacking'}
                    onChange={handleTypeChange}
                />
                Backpacking
            </label>
            
            <label>
                <input 
                    ref={radioSecondRef}
                    type='radio' 
                    name='backpackType' 
                    value='canoeing'
                    checked={backpackType === 'canoeing'}
                    onChange={handleTypeChange}
                />
                Canoeing
            </label>

            <label>
                <input 
                    ref={radioThirdRef}
                    type='radio' 
                    name='backpackType' 
                    value='climbing'
                    checked={backpackType === 'climbing'}
                    onChange={handleTypeChange}
                />
                Climbing
            </label>
            
            <label>
                <input 
                    ref={radioFourthRef}
                    type='radio' 
                    name='backpackType' 
                    value='retired'
                    checked={backpackType === 'retired'}
                    onChange={handleTypeChange}
                />
                Retired
            </label>
            <br></br>

            <label>Select Elements</label>
            <select
                multiple // Allow multiple selections
                value={selectedElements}
                onChange={(e) => {
                    backpackGear = Array.from(e.target.backpackGear, (option) => option.value);
                    setBackpackGear(backpackGear);
                }}
            >
                {elements.map((gearInstance) => (
                    <option key={gearInstance._id} value={gearInstance.name}>
                        {gearInstance.serialNum} {/* Replace with the property name from MongoDB */}
                    </option>
                ))}
            </select>

            <label>Gear Purchased:</label>
            <input type="date" id="dateBought" name="Gear Purchased"></input>

        </form>
        
    );
};

export default BackpackForm;