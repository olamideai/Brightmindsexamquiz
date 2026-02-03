/**************************************************
 * TASFUED QUIZ APP – SINGLE SCRIPT.JS (v2.0)
 * Pure Vanilla JavaScript
 **************************************************/

/* ===============================
   1. GLOBAL VARIABLES & STATE
================================ */
let studentName = "";
let currentSubject = "";
let questions = [];
let currentIndex = 0;
let answers = {}; // { index: "A" }
let timer = null;
let timeLeft = 0;
let quizCompleted = false;

/* ===============================
   2. QUESTION DATA (SAMPLE)
   👉 You can add more subjects
================================ */
const QUESTION_BANK = {
  
  
  "EDU 101": [
  {
    q: "Which of the following is NOT identified as a component of Pedagogical Content Knowledge?",
    o: { A: "Knowledge of Subject Matter", B: "Knowledge of Students", C: "Knowledge of Educational Technology", D: "Knowledge of Curriculum" },
    a: "C"
  },
  {
    q: "What organization was established to regulate entry into the teaching profession in Nigeria?",
    o: { A: "Nigerian Union of Teachers", B: "Ministry of Education", C: "Teachers Registration Council of Nigeria (TRCN)", D: "National Education Council" },
    a: "C"
  },
  {
    q: "Which of the following is NOT one of the major ethics of the teaching profession?",
    o: { A: "Moral soundness", B: "Good character", C: "Political activism", D: "Dedication and Locality" },
    a: "C"
  },
  {
    q: "What is the role of the learners in the teaching-learning process?",
    o: { A: "A passive recipient of knowledge", B: "An active recipient of knowledge", C: "A follower of the teacher's instructions", D: "A recorder of information presented by the teacher" },
    a: "B"
  },
  {
    q: "What does the term \"content\" refer to in the teaching-learning process?",
    o: { A: "The physical environment where learning takes place", B: "The subject matter or knowledge the teacher intends to transmit", C: "The teaching methods employed by the teacher", D: "The assessment strategies used to evaluate learning" },
    a: "B"
  },
  {
    q: "What was the primary method of education in pre-colonial Nigeria?",
    o: { A: "Formal classroom instruction", B: "Informal, practical, community-based learning", C: "Distance learning through written correspondence", D: "Individual tutoring by specialized teachers" },
    a: "B"
  },
  {
    q: "Which institution was central to Islamic education in Northern Nigeria?",
    o: { A: "Grammar schools", B: "Government colleges", C: "Qur'anic schools", D: "British mission schools" },
    a: "C"
  },
  {
    q: "When did Christian missionary education begin in Nigeria?",
    o: { A: "11th century", B: "15th century", C: "19th century", D: "20th century" },
    a: "C"
  },
  {
    q: "What was the primary focus of the curriculum in missionary schools?",
    o: { A: "Science and technology", B: "The 3 R's and religious instruction", C: "Political education and colonial administration", D: "Traditional African knowledge systems" },
    a: "B"
  },
  {
    q: "How many years of primary education are specified in Nigeria's 6-3-3-4 education system?",
    o: { A: "3 years", B: "4 years", C: "5 years", D: "6 years" },
    a: "D"
  },
  {
    q: "Many people mistakenly believe that \"anyone can teach\" because:",
    o: { A: "Teaching is only for highly trained professionals", B: "Teaching occurs in both formal and informal situations", C: "Teaching is a very complex profession", D: "Teaching requires specialized scientific knowledge" },
    a: "B"
  },
  {
    q: "Teaching is defined as a process through which a teacher guides learners to acquire knowledge, skills, values, attitudes, and:",
    o: { A: "Entertainment", B: "Beliefs", C: "Technology", D: "Competition" },
    a: "B"
  },
  {
    q: "Which of the following steps involves checking what learners already know before teaching begins?",
    o: { A: "Guiding learning activities", B: "Evaluating learning outcomes", C: "Establishing entry behaviour", D: "Providing feedback" },
    a: "C"
  },
  {
    q: "In the teaching process, \"How shall I teach?\" refers to the:",
    o: { A: "Learner", B: "Evaluation", C: "Method", D: "Content" },
    a: "C"
  },
  {
    q: "The role of the teacher in the communication model corresponds to which element?",
    o: { A: "Message", B: "Receiver", C: "Channel", D: "Sender" },
    a: "D"
  },
  {
    q: "If learners fail to understand a lesson and the teacher decides to reteach using songs or games, this reflects teaching as:",
    o: { A: "Propaganda", B: "Communication", C: "Indoctrination", D: "Decision-making" },
    a: "D"
  },
  {
    q: "Indoctrination differs from teaching because indoctrination:",
    o: { A: "Promotes questioning and critical thinking", B: "Teaches step-by-step skills", C: "Forces beliefs on learners without allowing inquiry", D: "Involves two-way communication" },
    a: "C"
  },
  {
    q: "Instructional objectives are described as behavioural because they:",
    o: { A: "Describe the teacher’s activities during the lesson", B: "Indicate observable learner actions after instruction", C: "Explain the long-term aims of education", D: "Reflect only cognitive domain outcomes" },
    a: "B"
  },
  {
    q: "Which of the following is the MOST appropriate instructional objective for the topic Identification of Colours?",
    o: { A: "Understanding primary colours", B: "Learners will be taught primary colours", C: "Learners will identify the three primary colours", D: "Identifying and mixing primary colours" },
    a: "C"
  },
  {
    q: "Which action verb is MOST appropriate for an instructional objective in a lower primary colour-identification class?",
    o: { A: "Evaluate", B: "Identify", C: "Analyse", D: "Critique" },
    a: "B"
  },
  {
    q: "A teacher states: \"Learners will describe how mixing red and blue makes purple.\" This objective reflects which mastery level?",
    o: { A: "Knowledge", B: "Comprehension", C: "Application", D: "Evaluation" },
    a: "B"
  },
  {
    q: "Which of the following best illustrates the use of student–teacher joint preparation of objectives?",
    o: { A: "Teacher lists all lesson objectives alone", B: "Students decide what topic to teach next", C: "Teacher asks learners at the start what colours they wish to identify", D: "Students write all instructional objectives themselves" },
    a: "C"
  },
  {
    q: "The lowest level of Bloom’s cognitive domain is concerned with:",
    o: { A: "Making judgments", B: "Breaking information into parts", C: "Recalling previously learned facts", D: "Using concepts in new situations" },
    a: "C"
  },
  {
    q: "A teacher asks students to \"solve real-life problems using simultaneous equations.\" This objective belongs to:",
    o: { A: "Knowledge", B: "Application", C: "Analysis", D: "Evaluation" },
    a: "B"
  },
  {
    q: "The ability to identify assumptions, differentiate facts from opinions, and detect relationships describes which cognitive level?",
    o: { A: "Analysis", B: "Synthesis", C: "Evaluation", D: "Comprehension" },
    a: "A"
  },
  {
    q: "\"Formulate a new method for assessing learner participation in class.\" This objective fits into:",
    o: { A: "Application", B: "Synthesis", C: "Comprehension", D: "Knowledge" },
    a: "B"
  },
  {
    q: "Education contributes to human capital formation primarily by:",
    o: { A: "Increasing national tax rates", B: "Equipping individuals with skills and competencies for productive work", C: "Reducing population growth automatically", D: "Eliminating all forms of discrimination" },
    a: "B"
  },
  {
    q: "One major way education reduces poverty is by:",
    o: { A: "Promoting cultural diversity", B: "Restricting technological advancement", C: "Increasing earning capacity and improving standards of living", D: "Encouraging early retirement" },
    a: "C"
  },
  {
    q: "A skilled and educated workforce enhances national economic growth mainly because it:",
    o: { A: "Makes citizens more religious", B: "Attracts investments and boosts industrialization", C: "Reduces the need for international relations", D: "Eliminates the informal sector" },
    a: "B"
  },
  {
    q: "Education promotes social development through:",
    o: { A: "Forced cultural assimilation", B: "Transmission of societal values, norms, and desirable behaviours", C: "Avoiding interaction between different social groups", D: "Removing traditional practices entirely" },
    a: "B"
  },
  {
    q: "Which of the following best describes how education reduces social inequalities?",
    o: { A: "It increases competition among the wealthy", B: "It gives equal educational opportunities to marginalized groups", C: "It eliminates all cultural practices", D: "It reduces the need for government policies" },
    a: "B"
  },
  {
    q: "Educated individuals tend to make better health choices because they:",
    o: { A: "Rely solely on cultural myths", B: "Understand health information and adopt healthy lifestyles", C: "Avoid formal medical systems", D: "Fully depend on traditional healers" },
    a: "B"
  },
  {
    q: "Education supports political development by:",
    o: { A: "Encouraging voter intimidation", B: "Promoting civic awareness and respect for human rights", C: "Eliminating political parties", D: "Reducing public participation in governance" },
    a: "B"
  },
  {
    q: "One major link between education and technological development is that education:",
    o: { A: "Prevents the adoption of new technologies", B: "Encourages scientific thinking and innovation", C: "Focuses mainly on outdated knowledge", D: "Discourages creativity" },
    a: "B"
  },
  {
    q: "Education promotes cultural development by:",
    o: { A: "Eliminating indigenous languages", B: "Suppressing cultural differences", C: "Preserving cultural heritage and encouraging cultural tolerance", D: "Discouraging interaction with other cultures" },
    a: "C"
  }
],
   
  "PHY 101": [
    {
      q: "Which of the following is a fundamental physical quantity?",
      o: { A: "Force", B: "Velocity", C: "Mass", D: "Pressure" },
      a: "C"
    },
    {
      q: "The SI unit of force is",
      o: { A: "Joule", B: "Watt", C: "Newton", D: "Pascal" },
      a: "C"
    },
    {
      q: "Which of the following quantities is dimensionless?",
      o: { A: "Density", B: "Strain", C: "Pressure", D: "Acceleration" },
      a: "B"
    },
    {
      q: "The dimensional formula of velocity is",
      o: { A: "[LT⁻¹]", B: "[LT⁻²]", C: "[MLT⁻¹]", D: "[L²T⁻¹]" },
      a: "A"
    },
    {
      q: "A vector quantity has",
      o: { A: "magnitude only", B: "direction only", C: "magnitude and direction", D: "neither magnitude nor direction" },
      a: "C"
    },
    {
      q: "Which of the following is a scalar quantity?",
      o: { A: "Displacement", B: "Velocity", C: "Acceleration", D: "Speed" },
      a: "D"
    },
    {
      q: "The slope of a displacement–time graph represents",
      o: { A: "acceleration", B: "velocity", C: "distance", D: "momentum" },
      a: "B"
    },
    {
      q: "The area under a velocity–time graph gives",
      o: { A: "acceleration", B: "speed", C: "displacement", D: "force" },
      a: "C"
    },
    {
      q: "Work is said to be done when a force causes",
      o: { A: "heat", B: "motion", C: "pressure", D: "friction" },
      a: "B"
    },
    {
      q: "The SI unit of work is",
      o: { A: "Newton", B: "Joule", C: "Watt", D: "Pascal" },
      a: "B"
    },
    {
      q: "Kinetic energy depends on",
      o: { A: "mass only", B: "velocity only", C: "mass and velocity", D: "force and distance" },
      a: "C"
    },
    {
      q: "Potential energy due to gravity depends on",
      o: { A: "mass and height", B: "mass and speed", C: "force and time", D: "height and velocity" },
      a: "A"
    },
    {
      q: "Motion of a body along a circular path at constant speed is called",
      o: { A: "linear motion", B: "oscillatory motion", C: "uniform circular motion", D: "random motion" },
      a: "C"
    },
    {
      q: "The force acting on a body in circular motion is directed towards the",
      o: { A: "center", B: "tangent", C: "surface", D: "outside" },
      a: "A"
    },
    {
      q: "This force is known as",
      o: { A: "gravitational force", B: "frictional force", C: "centripetal force", D: "centrifugal force" },
      a: "C"
    },
    {
      q: "The angular velocity of a body in circular motion is measured in",
      o: { A: "m/s", B: "rad/s", C: "m/s²", D: "rad" },
      a: "B"
    },
    {
      q: "Simple harmonic motion is a motion in which the restoring force is",
      o: { A: "constant", B: "zero", C: "proportional to displacement", D: "proportional to velocity" },
      a: "C"
    },
    {
      q: "Which of the following executes simple harmonic motion?",
      o: { A: "A falling stone", B: "A vibrating tuning fork", C: "A moving car", D: "Flowing water" },
      a: "B"
    },
    {
      q: "The time taken for one complete oscillation is called",
      o: { A: "frequency", B: "amplitude", C: "period", D: "wavelength" },
      a: "C"
    },
    {
      q: "The SI unit of frequency is",
      o: { A: "second", B: "hertz", C: "radian", D: "joule" },
      a: "B"
    },
    {
      q: "A rigid body is one in which the distance between particles remains",
      o: { A: "variable", B: "zero", C: "constant", D: "infinite" },
      a: "C"
    },
    {
      q: "The turning effect of a force is known as",
      o: { A: "momentum", B: "work", C: "torque", D: "energy" },
      a: "C"
    },
    {
      q: "Torque is the product of",
      o: { A: "force and velocity", B: "force and distance from pivot", C: "mass and acceleration", D: "pressure and area" },
      a: "B"
    },
    {
      q: "The SI unit of torque is",
      o: { A: "Nm", B: "J", C: "W", D: "kgm²" },
      a: "A"
    },
    {
      q: "The point about which a body rotates is called",
      o: { A: "center of mass", B: "pivot", C: "centroid", D: "axis" },
      a: "D"
    },
    {
      q: "The moment of inertia depends on",
      o: { A: "mass only", B: "shape only", C: "mass distribution", D: "velocity" },
      a: "C"
    },
    {
      q: "Matter is made up of",
      o: { A: "waves", B: "molecules", C: "energy", D: "force" },
      a: "B"
    },
    {
      q: "Elasticity is the ability of a material to",
      o: { A: "conduct heat", B: "change color", C: "regain original shape", D: "break easily" },
      a: "C"
    },
    {
      q: "Hooke’s law states that stress is proportional to",
      o: { A: "force", B: "strain", C: "pressure", D: "energy" },
      a: "B"
    },
    {
      q: "The SI unit of stress is",
      o: { A: "N", B: "Nm", C: "N/m²", D: "kg" },
      a: "C"
    },
    {
      q: "Which property explains why liquids flow?",
      o: { A: "Elasticity", B: "Viscosity", C: "Plasticity", D: "Rigidity" },
      a: "B"
    },
    {
      q: "Surface tension is measured in",
      o: { A: "N", B: "N/m", C: "J", D: "kg/m³" },
      a: "B"
    },
    {
      q: "Heat is a form of",
      o: { A: "matter", B: "force", C: "energy", D: "mass" },
      a: "C"
    },
    {
      q: "The SI unit of heat is",
      o: { A: "calorie", B: "joule", C: "watt", D: "kelvin" },
      a: "B"
    },
    {
      q: "Temperature is a measure of",
      o: { A: "total heat", B: "average kinetic energy", C: "total energy", D: "internal energy" },
      a: "B"
    },
    {
      q: "The SI unit of temperature is",
      o: { A: "Celsius", B: "Fahrenheit", C: "Kelvin", D: "Joule" },
      a: "C"
    },
    {
      q: "Heat transfer by direct contact is called",
      o: { A: "radiation", B: "convection", C: "conduction", D: "evaporation" },
      a: "C"
    },
    {
      q: "The first law of thermodynamics is a statement of conservation of",
      o: { A: "mass", B: "momentum", C: "energy", D: "force" },
      a: "C"
    },
    {
      q: "A thermodynamic system that exchanges energy but not matter is",
      o: { A: "isolated", B: "closed", C: "open", D: "adiabatic" },
      a: "B"
    },
    {
      q: "Boyle’s law states that pressure is inversely proportional to",
      o: { A: "temperature", B: "mass", C: "volume", D: "density" },
      a: "C"
    },
    {
      q: "Charles’ law relates volume and",
      o: { A: "pressure", B: "mass", C: "temperature", D: "density" },
      a: "C"
    },
    {
      q: "The SI unit of pressure is",
      o: { A: "bar", B: "atmosphere", C: "pascal", D: "mmHg" },
      a: "C"
    },
    {
      q: "Which gas law combines Boyle’s and Charles’ laws?",
      o: { A: "Dalton’s law", B: "Ideal gas law", C: "Graham’s law", D: "Avogadro’s law" },
      a: "B"
    },
    {
      q: "The equation of state of an ideal gas is",
      o: { A: "PV = T", B: "PV = nRT", C: "P = V/T", D: "V = nR" },
      a: "B"
    },
    {
      q: "Absolute zero temperature is",
      o: { A: "0°C", B: "−100°C", C: "−273°C", D: "273°C" },
      a: "C"
    },
    {
      q: "At constant pressure, increase in temperature causes volume to",
      o: { A: "decrease", B: "remain constant", C: "increase", D: "disappear" },
      a: "C"
    },
    {
      q: "The number of molecules in a gas depends on",
      o: { A: "pressure only", B: "volume only", C: "temperature only", D: "amount of gas" },
      a: "D"
    },
    {
      q: "Real gases deviate from ideal behavior at",
      o: { A: "high temperature and low pressure", B: "low temperature and high pressure", C: "room temperature", D: "constant volume" },
      a: "B"
    },
    {
      q: "Avogadro’s law states that equal volumes of gases at the same temperature and pressure contain",
      o: { A: "equal masses", B: "equal densities", C: "equal number of molecules", D: "equal energies" },
      a: "C"
    },
    {
      q: "Which instrument is used to measure gas pressure?",
      o: { A: "Thermometer", B: "Barometer", C: "Hygrometer", D: "Calorimeter" },
      a: "B"
    }
  ],
  
  
  "CHM 101": [
    {
      q: "Which of the following is a physical change?",
      o: { A: "Rusting of iron", B: "Burning of wood", C: "Sublimation of camphor", D: "Neutralization" },
      a: "C"
    },
    {
      q: "The fundamental particle of matter that can take part in a chemical reaction is the ______.",
      o: { A: "Molecule", B: "Atom", C: "Ion", D: "Electron" },
      a: "B"
    },
    {
      q: "A pure substance that cannot be broken down into simpler substances by chemical means is a/an ______.",
      o: { A: "Compound", B: "Element", C: "Mixture", D: "Alloy" },
      a: "B"
    },
    {
      q: "Which law states that \"matter can neither be created nor destroyed\"?",
      o: { A: "Law of Constant Composition", B: "Law of Multiple Proportions", C: "Law of Conservation of Mass", D: "Law of Reciprocal Proportion" },
      a: "C"
    },
    {
      q: "A mixture of sand and ammonium chloride can best be separated by ______.",
      o: { A: "Filtration", B: "Distillation", C: "Sublimation", D: "Decantation" },
      a: "C"
    },
    {
      q: "Who discovered the nucleus of the atom?",
      o: { A: "J.J. Thomson", B: "Ernest Rutherford", C: "James Chadwick", D: "John Dalton" },
      a: "B"
    },
    {
      q: "The maximum number of electrons that can occupy the 'p' orbital is ______.",
      o: { A: "2", B: "6", C: "10", D: "14" },
      a: "B"
    },
    {
      q: "What is the electronic configuration of Calcium (Z=20)?",
      o: { A: "[Ar] 4s\u00B2", B: "[Ar] 3d\u00B2", C: "[Ne] 3s\u00B2 3p\u00B6", D: "1s\u00B2 2s\u00B2 2p\u00B6 3s\u00B2" },
      a: "A"
    },
    {
      q: "Isotopes of the same element have the same number of ______ but different number of ______.",
      o: { A: "Protons, electrons", B: "Protons, neutrons", C: "Neutrons, protons", D: "Electrons, protons" },
      a: "B"
    },
    {
      q: "The shape of the 's' orbital is ______.",
      o: { A: "Dumbbell", B: "Spherical", C: "Cloverleaf", D: "Linear" },
      a: "B"
   },
    {
      q: "A bond formed by the sharing of electrons between two atoms is called a/an ______ bond.",
      o: { A: "Ionic", B: "Metallic", C: "Covalent", D: "Dative" },
      a: "C"
    },
    {
      q: "In the Lewis structure of NH\u2083, how many lone pairs are on the Nitrogen atom?",
      o: { A: "0", B: "1", C: "2", D: "3" },
      a: "B"
    },
    {
      q: "Which of the following molecules violates the octet rule?",
      o: { A: "CH\u2084", B: "PCl\u2085", C: "H\u2082O", D: "CO\u2082" },
      a: "B"
    },
    {
      q: "An electrovalent bond is formed between ______.",
      o: { A: "Two non-metals", B: "A metal and a non-metal", C: "Two metals", D: "Noble gases" },
      a: "B"
    },
    {
      q: "Which molecule contains a triple bond?",
      o: { A: "O\u2082", B: "N\u2082", C: "H\u2082", D: "Cl\u2082" },
      a: "B"
    },
    {
      q: "The hybridization of the central Carbon atom in methane (CH\u2084) is ______.",
      o: { A: "sp", B: "sp\u00B2", C: "sp\u00B3", D: "dsp\u00B2" },
      a: "C"
    },
    {
      q: "A molecule with sp\u00B2 hybridization typically has a ______ geometry.",
      o: { A: "Linear", B: "Tetrahedral", C: "Trigonal planar", D: "Octahedral" },
      a: "C"
    },
    {
      q: "What is the bond angle in a water molecule?",
      o: { A: "180\u00B0", B: "120\u00B0", C: "109.5\u00B0", D: "104.5\u00B0" },
      a: "D"
    },
    {
      q: "According to VSEPR theory, the shape of BeCl\u2082 is ______.",
      o: { A: "Linear", B: "Bent", C: "Trigonal Bipyramidal", D: "Square Planar" },
      a: "A"
    },
    {
      q: "In ethene (C\u2082H\u2084), the bond between carbon atoms consists of ______.",
      o: { A: "Two sigma bonds", B: "Two pi bonds", C: "One sigma and one pi bond", D: "One sigma bond" },
      a: "C"
    },
    {
      q: "How many moles are in 22g of CO\u2082? (C=12, O=16)",
      o: { A: "0.5 moles", B: "1.0 moles", C: "2.0 moles", D: "0.25 moles" },
      a: "A"
    },
    {
      q: "The number of particles in one mole of a substance is ______ (Avogadro’s number).",
      o: { A: "6.02 × 10\u2072\u2072", B: "6.02 × 10\u2072\u2073", C: "1.6 × 10\u207B\u00B9\u2079", D: "3.0 × 10\u2078" },
      a: "B"
    },
    {
      q: "The empirical formula of a compound with molecular formula C\u2086H\u2081\u2082O\u2086 is ______.",
      o: { A: "CH\u2082O", B: "CHO", C: "C\u2082H\u2084O\u2082", D: "C\u2083H\u2086O\u2083" },
      a: "A"
    },
    {
      q: "What volume will 0.5 moles of an ideal gas occupy at STP?",
      o: { A: "22.4 L", B: "11.2 L", C: "44.8 L", D: "5.6 L" },
      a: "B"
    },
    {
      q: "The percentage composition of Oxygen in NaOH is ______ (Na=23, O=16, H=1).",
      o: { A: "40%", B: "16%", C: "50%", D: "25%" },
      a: "A"
    },
    {
      q: "A reaction where heat is released to the surroundings is called ______.",
      o: { A: "Endothermic", B: "Exothermic", C: "Isothermic", D: "Adiabatic" },
      a: "B"
    },
    {
      q: "The minimum energy required for a reaction to occur is called ______.",
      o: { A: "Kinetic energy", B: "Activation energy", C: "Potential energy", D: "Free energy" },
      a: "B"
    },
    {
      q: "Increasing the concentration of reactants generally ______ the rate of reaction.",
      o: { A: "Decreases", B: "Increases", C: "Does not change", D: "Stops" },
      a: "B"
    },
    {
      q: "A substance that speeds up a reaction without being consumed is a ______.",
      o: { A: "Reactant", B: "Product", C: "Catalyst", D: "Inhibitor" },
      a: "C"
    },
    {
      q: "Which of the following is a decomposition reaction?",
      o: { A: "A + B → AB", B: "AB → A + B", C: "AB + C → AC + B", D: "HCl + NaOH → NaCl + H\u2082O" },
      a: "B"
    },
    {
      q: "At equilibrium, the rate of the forward reaction is ______ the rate of the reverse reaction.",
      o: { A: "Greater than", B: "Less than", C: "Equal to", D: "Zero" },
      a: "C"
    },
    {
      q: "According to Le Chatelier's principle, increasing pressure on a gaseous system will shift equilibrium towards the side with ______.",
      o: { A: "More moles", B: "Fewer moles", C: "Higher temperature", D: "Lower density" },
      a: "B"
    },
    {
      q: "For the reaction N\u2082 + 3H\u2082 ⇌ 2NH\u2083, what is the expression for K\u208C?",
      o: { A: "[NH\u2083] / [N\u2082][H\u2082]", B: "[NH\u2083]\u00B2 / [N\u2082][H\u2082]\u00B3", C: "[N\u2082][H\u2082]\u00B3 / [NH\u2083]\u00B2", D: "[NH\u2083] / [N\u2082][H\u2082]\u00B2" },
      a: "B"
    },
    {
      q: "A system at equilibrium is said to be ______.",
      o: { A: "Static", B: "Dynamic", C: "Unstable", D: "Finished" },
      a: "B"
    },
    {
      q: "The effect of a catalyst on a system at equilibrium is to ______.",
      o: { A: "Shift it to the right", B: "Shift it to the left", C: "Reach equilibrium faster", D: "Increase the yield" },
      a: "C"
    },
    {
      q: "In an electrochemical cell, oxidation occurs at the ______.",
      o: { A: "Cathode", B: "Anode", C: "Salt bridge", D: "Electrolyte" },
      a: "B"
    },
    {
      q: "The process of using electricity to decompose a chemical compound is ______.",
      o: { A: "Hydrolysis", B: "Electrolysis", C: "Photolysis", D: "Pyrolysis" },
      a: "B"
    },
    {
      q: "Which of the following is a strong electrolyte?",
      o: { A: "CH\u2083COOH", B: "NH\u2084OH", C: "H\u2082SO\u2084", D: "Pure water" },
      a: "C"
    },
    {
      q: "The unit of electrical charge is the ______.",
      o: { A: "Volt", B: "Ampere", C: "Coulomb", D: "Ohm" },
      a: "C"
    },
    {
      q: "According to Faraday's first law, m = ZIt. What does 'I' represent?",
      o: { A: "Time", B: "Current", C: "Mass", D: "Electrochemical equivalent" },
      a: "B"
    },
    {
      q: "Elements in Group 18 of the periodic table are known as ______.",
      o: { A: "Halogens", B: "Alkali metals", C: "Noble gases", D: "Alkaline earth metals" },
      a: "C"
    },
    {
      q: "Electronegativity ______ across a period from left to right.",
      o: { A: "Decreases", B: "Increases", C: "Remains constant", D: "Fluctuates" },
      a: "B"
    },
    {
      q: "The general formula for Alkanes is __.",
      o: { A: "C\u209CnH\u2092n", B: "C\u209CnH\u2092n+2", C: "C\u209CnH\u2092n-2", D: "C\u209CnH\u2092n+1" },
      a: "B"
    },
    {
      q: "The functional group of an Alkanol (Alcohol) is ______.",
      o: { A: "-COOH", B: "-CHO", C: "-OH", D: "-NH\u2082" },
      a: "C"
    },
    {
      q: "CH\u2083CH\u2082CH\u2083 is the IUPAC name for ______.",
      o: { A: "Methane", B: "Ethane", C: "Propane", D: "Butane" },
      a: "C"
    },
    {
      q: "Which of the following is an aromatic hydrocarbon?",
      o: { A: "Hexane", B: "Benzene", C: "Cyclohexane", D: "Ethene" },
      a: "B"
    },
    {
      q: "Isomers are compounds with the same ______ but different ______.",
      o: { A: "Physical properties, molecular formula", B: "Molecular formula, structural arrangement", C: "Atomic number, mass number", D: "Boiling point, melting point" },
      a: "B"
    },
    {
      q: "The reaction between an organic acid and an alcohol to form an ester is ______.",
      o: { A: "Saponification", B: "Esterification", C: "Polymerization", D: "Fermentation" },
      a: "B"
    },
    {
      q: "Which element is the most electronegative in the periodic table?",
      o: { A: "Oxygen", B: "Chlorine", C: "Fluorine", D: "Nitrogen" },
      a: "C"
    },
    {
      q: "The conversion of glucose to ethanol by yeast is called ______.",
      o: { A: "Distillation", B: "Fermentation", C: "Oxidation", D: "Hydrogenation" },
      a: "B"
    }
  ],


  "MTH 101": [
    {
      q: "If A = {1,2,3,4} and B = {3,4,5,6}, find A ∩ B",
      o: { A: "{1,2}", B: "{3,4}", C: "{5,6}", D: "{1,2,5,6}" },
      a: "B"
    },
    {
      q: "Given U = {1,2,3,4,5,6,7,8} and A = {2,4,6,8}, find A'",
      o: { A: "{1,3,5,7}", B: "{2,4,6,8}", C: "{1,2,3,4}", D: "{5,6,7,8}" },
      a: "A"
    },
    {
      q: "If n(A)=15, n(B)=20 and n(A ∩ B)=5, find n(A ∪ B)",
      o: { A: "25", B: "30", C: "35", D: "40" },
      a: "B"
    },
    {
      q: "The empty set is represented by",
      o: { A: "{0}", B: "{}", C: "1", D: "{ }" },
      a: "B"
    },
    {
      q: "If A ⊂ B, then",
      o: {
        A: "A has more elements than B",
        B: "Every element of A is in B",
        C: "A = B",
        D: "A and B are disjoint"
      },
      a: "B"
    },
    {
      q: "Which of the following is an irrational number?",
      o: { A: "0.25", B: "√2", C: "3/4", D: "0.5" },
      a: "B"
    },
    {
      q: "Simplify √50",
      o: { A: "5√2", B: "10√5", C: "25", D: "2√25" },
      a: "A"
    },
    {
      q: "The decimal representation of a rational number is",
      o: {
        A: "Non-terminating",
        B: "Non-repeating",
        C: "Terminating or repeating",
        D: "Always infinite"
      },
      a: "C"
    },
    {
      q: "Evaluate |−7|",
      o: { A: "−7", B: "7", C: "0", D: "−14" },
      a: "B"
    },
    {
      q: "Arrange in ascending order: −3, 2, −1, 4",
      o: {
        A: "−3, −1, 2, 4",
        B: "−1, −3, 2, 4",
        C: "2, −1, −3, 4",
        D: "4, 2, −1, −3"
      },
      a: "A"
    },
    {
      q: "The degree of the polynomial 4x³ − 2x + 7 is",
      o: { A: "1", B: "2", C: "3", D: "4" },
      a: "C"
    },
    {
      q: "Find f(2) if f(x) = x² − 3x + 1",
      o: { A: "−1", B: "0", C: "1", D: "3" },
      a: "A"
    },
    {
      q: "Which of the following is a quadratic polynomial?",
      o: { A: "3x + 1", B: "x² − 5x + 6", C: "x³ − x + 1", D: "7" },
      a: "B"
    },
    {
      q: "Simplify (x + 3)(x − 2)",
      o: {
        A: "x² + x − 6",
        B: "x² − x − 6",
        C: "x² + 5x − 6",
        D: "x² − 5x + 6"
      },
      a: "A"
    },
    {
      q: "The constant term in 2x³ − x + 5 is",
      o: { A: "2", B: "−1", C: "5", D: "3" },
      a: "C"
    },
    {
      q: "Find the next term: 2, 4, 6, 8, ___",
      o: { A: "9", B: "10", C: "12", D: "16" },
      a: "B"
    },
    {
      q: "The sequence 1, 4, 9, 16, ... is",
      o: { A: "Arithmetic", B: "Geometric", C: "Quadratic", D: "Harmonic" },
      a: "C"
    },
    {
      q: "Find the common difference of 5, 8, 11, 14",
      o: { A: "2", B: "3", C: "4", D: "5" },
      a: "B"
    },
    {
      q: "Find the 5th term of 3, 6, 9, ...",
      o: { A: "12", B: "15", C: "18", D: "21" },
      a: "B"
    },
    {
      q: "The sum of the first 5 natural numbers is",
      o: { A: "10", B: "15", C: "20", D: "25" },
      a: "B"
    },
    {
      q: "The value of i² is",
      o: { A: "1", B: "−1", C: "i", D: "−i" },
      a: "B"
    },
    {
      q: "Simplify (3 + 2i) + (1 − i)",
      o: { A: "4 + i", B: "2 + i", C: "3 + i", D: "4 − i" },
      a: "A"
    },
    {
      q: "Simplify (2 + i)(2 − i)",
      o: { A: "3", B: "4", C: "5", D: "6" },
      a: "C"
    },
    {
      q: "The real part of 5 − 7i is",
      o: { A: "−7", B: "7", C: "5", D: "i" },
      a: "C"
    },
    {
      q: "Which of the following is a pure imaginary number?",
      o: { A: "3 + i", B: "5", C: "−2i", D: "1 − i" },
      a: "C"
    },
    {
      q: "Solve x² − 5x + 6 = 0",
      o: { A: "x = 1, 6", B: "x = 2, 3", C: "x = −2, −3", D: "x = 0, 6" },
      a: "B"
    },
    {
      q: "The roots of x² + 9 = 0 are",
      o: { A: "±3", B: "±9", C: "±3i", D: "±9i" },
      a: "C"
    },
    {
      q: "If f(x) = x³ − 2x + 1, find the remainder when divided by (x − 1)",
      o: { A: "0", B: "−1", C: "1", D: "2" },
      a: "C"
    },
    {
      q: "The discriminant of x² − 4x + 4 = 0 is",
      o: { A: "0", B: "4", C: "−4", D: "16" },
      a: "A"
    },
    {
      q: "A quadratic equation has equal roots when",
      o: { A: "b² − 4ac > 0", B: "b² − 4ac < 0", C: "b² − 4ac = 0", D: "a = 0" },
      a: "C"
    },
    {
      q: "sin 30 =",
      o: { A: "1", B: "1/2", C: "√3/2", D: "0" },
      a: "B"
    },
    {
      q: "cos 60 =",
      o: { A: "1/2", B: "√3/2", C: "1", D: "0" },
      a: "A"
    },
    {
      q: "In a right-angled triangle",
      o: {
        A: "hyp² = sum of sides",
        B: "hyp = opposite",
        C: "hyp² = a² + b²",
        D: "all sides equal"
      },
      a: "C"
    },
    {
      q: "If tan t = 3/4, find sin t",
      o: { A: "3/5", B: "4/5", C: "5/3", D: "5/4" },
      a: "A"
    },
    {
      q: "Find the hypotenuse if sides are 6 cm and 8 cm",
      o: { A: "10 cm", B: "12 cm", C: "14 cm", D: "16 cm" },
      a: "A"
    },
    {
      q: "Which is a real number?",
      o: { A: "i", B: "√−9", C: "−5", D: "2i" },
      a: "C"
    },
    {
      q: "If A = {a,b,c}, number of subsets is",
      o: { A: "3", B: "6", C: "8", D: "9" },
      a: "C"
    },
    {
      q: "Solve 2x − 3 = 7",
      o: { A: "2", B: "3", C: "4", D: "5" },
      a: "D"
    },
    {
      q: "Sum of angles in a triangle is",
      o: { A: "90", B: "180", C: "270", D: "360" },
      a: "B"
    },
    {
      q: "Opposite/hypotenuse is",
      o: { A: "cos", B: "tan", C: "sin", D: "cot" },
      a: "C"
    },
    {
      q: "Product of roots of x² − 7x + 10 = 0 is",
      o: { A: "7", B: "10", C: "−10", D: "−7" },
      a: "B"
    },
    {
      q: "Simplify √81",
      o: { A: "8", B: "9", C: "−9", D: "7" },
      a: "B"
    },
    {
      q: "A sequence with common ratio is",
      o: { A: "Arithmetic", B: "Geometric", C: "Harmonic", D: "Linear" },
      a: "B"
    },
    {
      q: "The imaginary unit is",
      o: { A: "√−1", B: "√1", C: "−1", D: "1" },
      a: "A"
    },
    {
      q: "Evaluate 5⁰",
      o: { A: "0", B: "1", C: "5", D: "undefined" },
      a: "B"
    },
    {
      q: "The remainder when f(x) is divided by (x − a) is",
      o: { A: "f(x)", B: "f(a)", C: "a", D: "x" },
      a: "B"
    },
    {
      q: "If sin t = 1, then t =",
      o: { A: "0", B: "30", C: "60", D: "90" },
      a: "D"
    },
    {
      q: "Real numbers include",
      o: {
        A: "integers only",
        B: "rational only",
        C: "rational and irrational",
        D: "whole numbers only"
      },
      a: "C"
    },
    {
      q: "Solve x² = 16",
      o: { A: "x = 4", B: "x = −4", C: "x = ±4", D: "x = 8" },
      a: "C"
    },
    {
      q: "tan 45 =",
      o: { A: "0", B: "1/2", C: "1", D: "√3" },
      a: "C"
    }
  ]


    
};
