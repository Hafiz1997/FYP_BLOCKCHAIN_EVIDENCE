pragma solidity ^0.5.0;
// written for Solidity version 0.4.18 and above that doesnt break functionality

contract Fyp {

    string public name; 
    constructor() public {
        name = "UMU WIP";
    }

    // an event that is called whenever a data is added so the frontend could
    // appropriately display the data with the right element id (it is used
    // to show all the data, since it is one of arguments for the below function)
    event AddedEmployee(uint employeeID);
    event AddedEvidence(uint evidenceID);

    // describes user, which has an id and the ID of the evidence
    address owner;
    function _Fyp()public {
        owner=msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //describe employee
    struct Employee {
        uint eid; // bytes32 type are basically strings
        string isAdmin;//check if admin
    }
    //describe evidence
    struct Evidence {
        uint id;
        string name; 
    }

    // These state variables are used keep track of the number of employee/evidence 
    // and used to as a way to index them     
    uint public numEmployees; // declares a state variable
    uint numEvidences;

    
    // Think of these as a hash table, with the key as a uint and value of 
    // the struct employee/evidence. These mappings will be used in the majority
    // of our transactions/calls
    // These mappings will hold all the employee/evidence respectively
    mapping (uint => Employee) public employees;
    mapping (uint => Evidence) evidences;
    
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  These functions perform transactions, editing the mappings *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

     //add employee
     function addEmployee(uint _eid, string memory _admin) onlyOwner public {
        // employeeID is the return variable
        uint employeeID = numEmployees++;
        // Create new employee Struct with id and saves it to storage.
        employees[employeeID] = Employee(_eid,_admin);
        emit AddedEmployee(employeeID);
    }
    //add evidence
    function addEvidence(uint _id, string memory _name) onlyOwner public {
        // evidenceID is the return variable
        uint evidenceID = numEvidences++;
        // Create new evidence Struct with id and saves it to storage.
        evidences[evidenceID] = Evidence(_id,_name);
        emit AddedEvidence(evidenceID);
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * 
     *  Getter Functions, marked by the key word "view" *
     * * * * * * * * * * * * * * * * * * * * * * * * * */

     //shows the total of employees/evidences
    function getNumEmployees() public view returns(uint) {
        return numEmployees;
    }
    function getNumEvidences() public view returns(uint) {
        return numEvidences;
    }

    // returns evidences information, including its ID and name
    function getEvidences(uint _evidenceID) public view returns (uint, uint, string memory) {
        return (_evidenceID,evidences[_evidenceID].id,evidences[_evidenceID].name);
    }

    /* * * * * * * * * * * * * * * * * * * * *  
     *  Functions used for validating logins *
     * * * * * * * * * * * * * * * * * * * * */
    //check for user validation
    function validateUser(uint _eid) public view returns (bool) {
        bool exist = false;
        for (uint i = 0; i < numEmployees; i++){
            //if exist, returns true
            if (employees[i].eid == _eid) {
                exist = true;
            }
        }
    }
    //check for admin validation
    function validateAdmin(string memory _isAdmin) public view returns (bool) {
        bool admin = false;
        for (uint i = 0; i < numEmployees; i++){
            //if exist, returns true
            if (keccak256(abi.encodePacked((employees[i].isAdmin))) == keccak256(abi.encodePacked((_isAdmin))) ) {
                admin = true;
            }
        }
    }
}
