document.getElementById('resumeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  generateResume();
});

function startBuilding() {
  document.querySelector('.hero').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
  addExperience();
  addEducation();
  addProject();
}

function addExperience() {
  const container = document.createElement('div');
  container.className = 'exp-entry';
  container.innerHTML = `
    <input type="text" placeholder="Job Title" class="jobTitle" />
    <input type="text" placeholder="Company Name" class="company" />
    <input type="text" placeholder="Duration" class="duration" />
    <textarea placeholder="Job Responsibilities" class="jobDetails" rows="3"></textarea>`;
  document.getElementById('experienceSection').appendChild(container);
}

function addEducation() {
  const container = document.createElement('div');
  container.className = 'edu-entry';
  container.innerHTML = `
    <input type="text" placeholder="Degree" class="degree" />
    <input type="text" placeholder="Institution" class="institution" />
    <input type="text" placeholder="Duration" class="eduDuration" />`;
  document.getElementById('educationSection').appendChild(container);
}

function addProject() {
  const container = document.createElement('div');
  container.className = 'project-entry';
  container.innerHTML = `
    <input type="text" placeholder="Project Title" class="projectTitle" />
    <textarea placeholder="Project Description" class="projectDesc" rows="2"></textarea>
    <input type="text" placeholder="Project Link (optional)" class="projectLink" />`;
  document.getElementById('projectSection').appendChild(container);
}

function generateResume() {
  const output = document.getElementById('resumeOutput');
  output.innerHTML = '';

  const imgFile = document.getElementById('profileImage').files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    const resumeHTML = `
      <div style="display:flex;">
        <div style="width:30%;padding:10px;background:#2c3e50;color:white;">
          ${imgFile ? `<img src="${reader.result}" style="width:100%;border-radius:10px;">` : ''}
          <h2>${getVal('fullName')}</h2>
          <h4>${getVal('title')}</h4>
          <p><strong>Guardian:</strong> ${getVal('guardian')}</p>
          <p>📞 ${getVal('phone')}</p>
          <p>✉️ ${getVal('email')}</p>
          <p>📍 ${getVal('address')}</p>
          <h4>Skills</h4><p>${getVal('skills')}</p>
          <h4>Languages</h4><p>${getVal('languages')}</p>
          <h4>Hobbies</h4><p>${getVal('hobbies')}</p>
        </div>
        <div style="width:70%;padding:10px;">
          <h3>Profile</h3><p>${getVal('profile')}</p>
          ${renderExperience()}
          ${renderEducation()}
          ${renderProjects()}
        </div>
      </div>`;
    output.innerHTML = resumeHTML;
  };
  if (imgFile) reader.readAsDataURL(imgFile);
  else reader.onloadend();
}

function getVal(id) {
  return document.getElementById(id).value.trim();
}

function renderExperience() {
  const entries = document.querySelectorAll('.exp-entry');
  if (!entries.length) return '';
  let html = '<h3>Experience</h3>';
  entries.forEach(e => {
    const job = e.querySelector('.jobTitle').value;
    const company = e.querySelector('.company').value;
    const duration = e.querySelector('.duration').value;
    const detail = e.querySelector('.jobDetails').value;
    if (job && detail) {
      html += `<p><strong>${job}</strong> at ${company} (${duration})</p><p>${detail}</p>`;
    }
  });
  return html;
}

function renderEducation() {
  const entries = document.querySelectorAll('.edu-entry');
  if (!entries.length) return '';
  let html = '<h3>Education</h3>';
  entries.forEach(e => {
    const degree = e.querySelector('.degree').value;
    const inst = e.querySelector('.institution').value;
    const duration = e.querySelector('.eduDuration').value;
    if (degree && inst) {
      html += `<p><strong>${degree}</strong> - ${inst} (${duration})</p>`;
    }
  });
  return html;
}

function renderProjects() {
  const entries = document.querySelectorAll('.project-entry');
  let html = '';
  entries.forEach(e => {
    const title = e.querySelector('.projectTitle').value;
    const desc = e.querySelector('.projectDesc').value;
    const link = e.querySelector('.projectLink').value;
    if (title || desc) {
      html += `<h3>Project: ${title}</h3><p>${desc}</p>`;
      if (link) html += `<p><a href="${link}" target="_blank">View Project</a></p>`;
    }
  });
  return html;
}

document.getElementById('downloadBtn').addEventListener('click', function () {
  const element = document.getElementById('resumeOutput');
  html2pdf().from(element).save('resume.pdf');
});
