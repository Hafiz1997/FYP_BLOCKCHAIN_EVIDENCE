pragma solidity ^0.5.0;
//NOTES:employee(admin/not) and evidence(validate/not)

contract Fyp {

    //for dapp name at constructor
    string public name;

    //for checking admin or not
    bool public _admin;

    //count total of objects currently
    uint public employeeCount = 0;
    uint public evidenceCount = 0;

    //refers to struct object, mapping for identification/differentiate
    mapping(uint => Employee) public employees;
    mapping(uint => Evidence) public evidences; 

    //struct for each objects variables
    struct Employee {
        uint employeeId;
        string employeeName;        
        address payable user;
        bool admin;
        bool isEmployee;
    }
    struct Evidence {
        uint evidenceId;
        string evidenceName;
        address payable author;
        address payable adminVerify;
        bool verify;
    }

    //event or trigger to be used when called, below events create objects
    event EmployeeCreated(
        uint employeeId,
        string employeeName,        
        address payable user,
        bool admin,
        bool isEmployee                 
    );
    event EvidenceCreated(
        uint evidenceId,
        string evidenceName,
        address payable author,
        address payable adminVerify,
        bool verify
    );

    //event or trigger to be used when called, below events validate/verify objects
    event EmployeeEmployed(
        uint employeeId,
        string employeeName,        
        address payable user,
        bool admin,
        bool isEmployee                 
    );
    event EvidenceVerified(
        uint evidenceId,
        string evidenceName,
        address payable author,
        address payable adminVerify,
        bool verify
    );

    //name of dapp
    constructor() public {
        name = "UMU WIP";
    }

    //function for creating the objects
    function createEmployee(string memory _name, address payable _employee, uint _isAdmin) public {
        //require name
        require(bytes(_name).length > 0);
        //require employee address
        //require(!_employee);
        //require admin to be set either 0 = false or 1 = true
        require(_isAdmin >= 0 && _isAdmin <= 1);
        employeeCount ++;       
        //check either admin or not
        if (_isAdmin == 0) {
            //not admin
            _admin = false;         
        }
        else {
            //is admin
            _admin = true;
        }
        //Create employee
        employees[employeeCount] = Employee(employeeCount, _name, _employee, _admin, true);
        //trigger event
        emit EmployeeCreated(employeeCount, _name, _employee, _admin, true);
    }
    function createEvidence(string memory _name) public {
        //require name
        require(bytes(_name).length > 0);       
        evidenceCount ++;
        //Create evidence
        evidences[evidenceCount] = Evidence(evidenceCount, _name, msg.sender, msg.sender, false);
        //trigger event
        emit EvidenceCreated(evidenceCount, _name, msg.sender, msg.sender, false);
    }   

    //function to verify evidence
    function verifyEvidence(uint _id) public payable {
        //fetch evidence
        Evidence memory _evidence = evidences[_id];

        //fetch user
        address payable _user = _evidence.author;

        //evidence has valid id
        require(_evidence.evidenceId > 0 && _evidence.evidenceId <= evidenceCount);     

        //evidence not yet verify
        require(!_evidence.verify);

        //require admin not user
        require(_user != msg.sender);

        //transfer ownership
        _evidence.adminVerify = msg.sender;

        //mark as verify
        _evidence.verify = true;

        //update evidence
        evidences[_id] = _evidence;     

        //trigger event
        emit EvidenceVerified(evidenceCount, _evidence.evidenceName, _evidence.author, msg.sender, true);
    }

}
