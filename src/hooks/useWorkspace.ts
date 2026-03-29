"use client";

import { useState } from "react";


export function useWorkspace(){
    const [loading, setLoading] = useState(true);

    function createWorkspace(){
        // call workspaceService.createWorkspace
    }

    return {loading, createWorkspace}
}