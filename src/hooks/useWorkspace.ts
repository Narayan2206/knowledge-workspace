"use client";

import { workspaceService } from "@/lib/services";
import { useState } from "react";


export function useWorkspace(){
    const [loading, setLoading] = useState(true);

    function createWorkspace(workspaceData: {
        name: string,
        slug: string,
        userId: string
    }){
        // call workspaceService.createWorkspace
        try {
            const response = workspaceService.createWorkspace({
                name: workspaceData.name,
                slug: workspaceData.slug,
                created_by: workspaceData.userId
            })
        } catch (error) {
            
        }
    }

    return {loading, createWorkspace}
}