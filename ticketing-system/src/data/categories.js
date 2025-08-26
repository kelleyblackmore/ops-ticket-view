export const categories = [
  {
    id: 'devops',
    name: 'DevOps',
    types: ['VM Request', 'Process Automation', 'CI/CD Pipeline'],
    tools: [
      {
        id: 'vault',
        name: 'HashiCorp Vault',
        types: ['Secret Update', 'Access to Secret', 'Create Secret'],
      },
      {
        id: 'jenkins',
        name: 'Jenkins',
        types: ['New Pipeline', 'Credential Update'],
      },
      {
        id: 'github',
        name: 'GitHub',
  types: ['Repo Access', 'Group Access', 'Branch Protection', 'Webhook Setup'],
      },
      {
        id: 'gitlab',
        name: 'GitLab',
  types: ['Project Access', 'Group Access', 'Pipeline Runner', 'Webhook Setup'],
      },
      {
        id: 'docker',
        name: 'Docker',
        types: ['Image Build', 'Registry Access', 'Container Issue'],
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        types: ['Namespace Access', 'Deployment Issue', 'Ingress/Service'],
      },
      {
        id: 'terraform',
        name: 'Terraform',
        types: ['Module Change', 'State Access', 'Provider Setup'],
      },
      {
        id: 'ansible',
        name: 'Ansible',
        types: ['Playbook Run', 'Inventory Access', 'Credential Setup'],
      },
    ],
  },
  {
    id: 'dba',
    name: 'DBA',
    types: ['DB Request', 'Backup/Restore', 'Performance Tuning'],
    tools: [
      { id: 'postgres', name: 'PostgreSQL', types: ['New Database', 'User/Role Access', 'Parameter Change'] },
      { id: 'mysql', name: 'MySQL', types: ['New Database', 'User/Role Access', 'Parameter Change'] },
      { id: 'oracle', name: 'Oracle', types: ['New Schema', 'Grant Access', 'Data Pump Export/Import'] },
    ],
  },
  {
    id: 'sysadmin',
    name: 'System Admins',
    types: ['User Account', 'Access Request', 'Server Provisioning'],
    tools: [
      { id: 'ad', name: 'Active Directory', types: ['New User', 'Group Membership', 'Password Reset'] },
  { id: 'ldap', name: 'LDAP', types: ['Create Group', 'Update Group', 'Add to Group'] },
  { id: 'idm', name: 'IDM', types: ['Create Group', 'Update Group', 'Add to Group'] },
      { id: 'vsphere', name: 'VMware vSphere', types: ['Provision VM', 'CPU/RAM Change', 'Snapshot/Restore'] },
    ],
  },
  {
    id: 'cyber',
    name: 'Cyber',
    types: ['Security Incident', 'Vulnerability Scan', 'Access Review'],
    tools: [
      { id: 'splunk', name: 'Splunk', types: ['Log Access', 'Saved Search', 'Alert Tuning'] },
      { id: 'crowdstrike', name: 'CrowdStrike', types: ['Add Host', 'Quarantine Exception', 'IOC Hunt'] },
    ],
  },
  {
    id: 'ia',
    name: 'IA',
    types: ['Audit Request', 'Compliance Check', 'Policy Update'],
    tools: [
      { id: 'nist', name: 'NIST Controls', types: ['Control Evidence', 'Control Update'] },
      { id: 'poam', name: 'POA&M', types: ['Add Item', 'Update Milestone', 'Close Item'] },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Engineers',
    types: ['Cloud Resource', 'Migration', 'Cost Optimization'],
    tools: [
      { id: 'aws', name: 'AWS', types: ['IAM Access', 'S3 Bucket', 'EC2 Instance', 'Security Group'] },
      { id: 'azure', name: 'Azure', types: ['RBAC Access', 'Storage Account', 'VM', 'NSG Rule'] },
      { id: 'gcp', name: 'GCP', types: ['IAM Policy', 'GCS Bucket', 'GCE VM', 'Firewall Rule'] },
    ],
  },
  {
    id: 'processes',
    name: 'Processes',
    types: ['VM Request', 'DB Request', 'Workflow Change'],
    tools: [
      { id: 'servicenow', name: 'ServiceNow', types: ['Catalog Item', 'Workflow Change', 'Assignment Group'] },
      { id: 'jira', name: 'Jira', types: ['Project Access', 'Workflow Change', 'Issue Type Change'] },
    ],
  },
];

export const statuses = ['Open', 'In Progress', 'Resolved'];
export const priorities = ['Low', 'Medium', 'High', 'Urgent'];
export const environments = ['Dev', 'Test', 'Staging', 'Prod'];
