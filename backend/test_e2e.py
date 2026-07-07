import urllib.request
import json
import time

BASE_URL = "http://localhost:8000/api/v1"

def post_json(url, data):
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read().decode())

def test():
    print("Generating workflow...")
    workflow = post_json(f"{BASE_URL}/workflows/generate", {
        "user_id": "u1",
        "request": "Extract the key revenue figures for Q3 2024 from the finance documents, generate a short markdown financial summary, and send it to the director for approval."
    })
    
    wf_id = workflow["workflow_id"]
    print(f"Generated Workflow {wf_id}:")
    for n in workflow["nodes"]:
        print(f" - {n['node_id']}: {n['capability_id']}")
        
    print("\nExecuting workflow...")
    exec_res = post_json(f"{BASE_URL}/workflows/{wf_id}/execute", {})
    print(f"Execution Output: {json.dumps(exec_res, indent=2)}")

if __name__ == "__main__":
    test()
