import React from "react";
//import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faGamepad, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "C++",
    "Blueprints",
    "Animation Blueprints",
    "Subsystems",
    "Data Management",
    "AI",
    "GAS",
    "Replication",
    "Game Math",
    "Perforce, SVN, Git"
];

const labelsSecond = [
    "Game Design Document Creation",
    "Combat Design",
    "Economy Balancing",
    "System Documentation",
    "Level Design",
    "Mechanic Prototyping",
    "Photoshop",
    "Turning Ideas into Systems"
];

const labelsThird = [
    "C++",
    "Meta Specifiers",
    "Blueprint Reflection",
    "Design Workflow Improvements",
    "Simplify complex behavior"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faCode} size="3x"/>
                    <h3>Gameplay Programming</h3>
                    <p>I have built a diverse array of gameplay and system features, including robust save/load architectures, persistent world systems that retain object states in World Partition, like doors, and Steam Sessions plugins to network Unreal Engine games.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Key Skills:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faGamepad} size="3x"/>
                    <h3>Technical Game Design</h3>
                    <p>I design gameplay systems and player loops that reinforce core fantasy and engagement. My work involves prototyping mechanics, balancing player progression, and designing feedback systems that enhance flow and replayability.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Key Skills:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faScrewdriverWrench} size="3x"/>
                    <h3>Designer Tooling</h3>
                    <p>I’ve developed modular gameplay tools that allow designers to customize actor behavior through intuitive property settings, eliminating the need for code. By leveraging meta specifiers and blueprint reflection, these systems enable deep configurability and highly flexible design workflows.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Key Skills:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;