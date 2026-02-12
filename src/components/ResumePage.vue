<template>
  <div class="resume-container">
    <div class="resume-header">
      <h1 class="resume-title">Professional Resume</h1>
      <p class="resume-subtitle">Showcasing my professional journey and skills</p>
    </div>

    <!-- Education Section -->
    <section class="resume-section" id="education">
      <h2 class="section-title">
        <i class="icon-education"></i>
        EDUCATION
      </h2>
      <div class="timeline">
        <div 
          v-for="(edu, index) in resumeData.education" 
          :key="'edu-' + index" 
          class="timeline-item"
          @mouseover="highlightItem('edu-' + index)"
          @mouseout="removeHighlight('edu-' + index)"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="degree">{{ edu.degree }}</h3>
            <p class="institution">{{ edu.institution }}</p>
            <p class="period-location">{{ edu.period }} | {{ edu.location }}</p>
            <ul class="details">
              <li v-for="(detail, idx) in edu.details" :key="'detail-' + idx">{{ detail }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Experience Section -->
    <section class="resume-section" id="projects">
      <h2 class="section-title">
        <i class="icon-project"></i>
        PROJECT EXPERIENCE
      </h2>
      <div class="timeline">
        <div 
          v-for="(project, index) in resumeData.projectExperience" 
          :key="'proj-' + index" 
          class="timeline-item"
          @mouseover="highlightItem('proj-' + index)"
          @mouseout="removeHighlight('proj-' + index)"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="role-company">{{ project.role }}, {{ project.company }}</p>
            <p class="period">{{ project.period }}</p>
            <p class="description">{{ project.description }}</p>
            <div class="skills-container">
              <span 
                v-for="(tech, idx) in project.technologies" 
                :key="'tech-' + idx" 
                class="skill-tag"
              >{{ tech }}</span>
            </div>
            <ul class="achievements">
              <li v-for="(achievement, idx) in project.achievements" :key="'ach-' + idx">{{ achievement }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Research Experience Section -->
    <section class="resume-section" id="research">
      <h2 class="section-title">
        <i class="icon-research"></i>
        RESEARCH EXPERIENCE
      </h2>
      <div class="timeline">
        <div 
          v-for="(research, index) in resumeData.researchExperience" 
          :key="'res-' + index" 
          class="timeline-item"
          @mouseover="highlightItem('res-' + index)"
          @mouseout="removeHighlight('res-' + index)"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="research-title">{{ research.title }}</h3>
            <p class="role-institution">{{ research.role }}, {{ research.institution }}</p>
            <p class="period">{{ research.period }}</p>
            <p class="description">{{ research.description }}</p>
            <div v-if="research.publications && research.publications.length > 0">
              <h4>Publications:</h4>
              <ul>
                <li v-for="(pub, idx) in research.publications" :key="'pub-' + idx">{{ pub }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Skills Section -->
    <section class="resume-section" id="skills">
      <h2 class="section-title">
        <i class="icon-skills"></i>
        ADDITIONAL SKILLS
      </h2>
      
      <div class="skills-grid">
        <div class="skill-category" v-if="resumeData.additionalSkills.technicalSkills">
          <h3>Technical Skills</h3>
          <div class="skills-container">
            <span 
              v-for="(skill, index) in resumeData.additionalSkills.technicalSkills" 
              :key="'tskill-' + index" 
              class="skill-tag"
              @click="filterProjectsBySkill(skill)"
            >{{ skill }}</span>
          </div>
        </div>
        
        <div class="skill-category" v-if="resumeData.additionalSkills.languages">
          <h3>Languages</h3>
          <ul>
            <li v-for="(lang, index) in resumeData.additionalSkills.languages" :key="'lang-' + index">{{ lang }}</li>
          </ul>
        </div>
        
        <div class="skill-category" v-if="resumeData.additionalSkills.certifications">
          <h3>Certifications</h3>
          <ul>
            <li v-for="(cert, index) in resumeData.additionalSkills.certifications" :key="'cert-' + index">{{ cert }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Interactive Elements -->
    <section class="interactive-section">
      <el-button 
        type="primary" 
        size="large" 
        @click="downloadResume"
        class="action-button"
      >
        Download Full Resume
      </el-button>
      
      <el-button 
        type="success" 
        size="large" 
        @click="contactMe"
        class="action-button"
      >
        Contact Me
      </el-button>
    </section>
  </div>
</template>

<script>
import resumeData from '../../public/api/resume.json'

export default {
  name: 'ResumePage',
  data() {
    return {
      resumeData: resumeData,
      highlightedItem: null
    }
  },
  methods: {
    highlightItem(itemId) {
      this.highlightedItem = itemId;
      const element = document.getElementById(itemId);
      if (element) {
        element.classList.add('highlighted');
      }
    },
    
    removeHighlight(itemId) {
      this.highlightedItem = null;
      const element = document.getElementById(itemId);
      if (element) {
        element.classList.remove('highlighted');
      }
    },
    
    downloadResume() {
      alert("Resume download functionality would be implemented here");
      // In a real implementation, you'd generate and download a PDF
    },
    
    contactMe() {
      // Open email client or contact form
      window.location.href = "mailto:your-email@example.com";
    },
    
    filterProjectsBySkill(skill) {
      alert(`Filtering projects by skill: ${skill}`);
      // Implementation would filter projects by technology used
    }
  }
}
</script>

<style scoped>
.resume-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.resume-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.resume-title {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.resume-subtitle {
  font-size: 1.2em;
  opacity: 0.9;
}

.resume-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid #667eea;
  display: flex;
  align-items: center;
  gap: 10px;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #667eea;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
  padding-left: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.timeline-marker {
  position: absolute;
  left: -33px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #667eea;
  border: 3px solid white;
  z-index: 1;
}

.timeline-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.degree, .project-title, .research-title {
  color: #333;
  font-size: 1.3em;
  margin-bottom: 5px;
}

.institution, .role-company, .role-institution {
  color: #666;
  font-weight: bold;
}

.period, .period-location {
  color: #888;
  font-style: italic;
  margin: 5px 0;
}

.description, .details, .achievements {
  margin: 15px 0;
  line-height: 1.6;
}

.skills-container {
  margin: 15px 0;
}

.skill-tag {
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 5px 12px;
  border-radius: 20px;
  margin: 0 5px 5px 0;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: #bbdefb;
  transform: scale(1.05);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.skill-category h3 {
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.interactive-section {
  text-align: center;
  margin: 40px 0;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
}

.action-button {
  margin: 0 10px;
  min-width: 150px;
}

/* Animation for timeline items */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-item {
  animation: fadeInUp 0.6s ease-out;
}
</style>