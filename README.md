Express.js GitOps Deployment Setup

This project demonstrates a modern GitOps-based deployment workflow using:


Express.js application


Docker for containerization


Kubernetes for orchestration


Helm for deployment templating


GitHub Actions for CI automation


Argo CD for GitOps deployments



High-Level Architecture
Developer Pushes Code        
↓
GitHub Actions CI Pipeline        
↓
Docker Image Build        
↓
Push Image to Container Registry        
↓
CI Updates Helm Image Tag        
↓
Git Repository Updated        
↓
Argo CD Detects Git Change        
↓
Kubernetes Deployment Updated        
↓
New Pods Created

📂 Project Structure
project/
│├── src/
├── Dockerfile
├── package.json
│├── helm-chart/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│└── .github/
└── workflows/        
└── ci.yml



Step 1 — Containerize the Application


Create a Dockerfile for the Express.js application.


Build the Docker image locally.


Verify the container runs correctly.


Push the image to a container registry.



Step 2 — Create Helm Chart


Create a Helm chart for the application.


Configure:


deployment


service


resource limits


replica count


image repository and tag




Store the Helm chart inside the repository.


Step 3 — Configure CI Pipeline
The CI pipeline performs:


checkout source code


install dependencies


build Docker image


scan Docker image


push image to registry


generate unique image tag using commit SHA


update Helm image tag automatically


commit updated Helm values back to Git



 Image Tagging Strategy
❌ Avoid Static Tags
Static tags like:
devlatest
can cause:


stale deployments


caching problems


inconsistent runtime versions



Use Immutable Tags
Use commit SHA-based tags for every deployment.
Benefits:


proper version tracking


easy rollback


predictable deployments


production-grade GitOps workflow


 Step 4 — Configure Argo CD


Install Argo CD in Kubernetes cluster.


Connect Git repository to Argo CD.


Create Argo CD Application manifest.


Configure:


repository URL


target branch


Helm chart path


destination namespace




Enable auto-sync and self-healing.



 Step 5 — GitOps Workflow
Important Principle
Git is the source of truth
Argo CD continuously monitors Git repository changes.
Whenever the Helm image tag changes:


Argo CD detects Git changes


Helm templates are rendered


Kubernetes manifests are generated


Deployment is updated automatically


New pods are created



 Step 6 — Verify Deployment
Verify:


pods are running


service is available


deployment is updated correctly


latest image version is deployed


Use port-forwarding for local access if required.

 Common Kubernetes Operations
Typical operations include:


checking pod status


viewing logs


inspecting deployments


checking running image versions


restarting deployments


verifying services and endpoints



 CI vs CD Responsibilities
ComponentResponsibilityCI PipelineBuild and push imagesGit RepositoryStore desired stateHelmKubernetes templatingArgo CDContinuous deploymentKubernetesApplication runtime

 Final Outcome
This setup provides:


automated container builds


immutable image versioning


GitOps-based deployments


automated Kubernetes updates


Helm-managed deployments


scalable CI/CD workflow


production-style deployment architecture



 Future Improvements
Possible next-level enhancements:


multiple environments (dev/qa/prod)


rollback strategy


blue-green deployments


canary deployments


observability and monitoring


secret management


approval-based production releases


automated testing stages

