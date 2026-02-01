<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use PhpParser\Node\Stmt\TryCatch;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employee = Employee::all();

        return response()->json([
            'status' => true,
            'message' => 'Employee fetch successful',
            'data' => $employee,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {

        $employee = Employee::create($request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Employee created successfully',
            'data' => $employee,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'status' => false,
                'message' => 'Employee not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Employee fetched successfully',
            'data' => $employee,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, $id)
    {
        $employee = Employee::withTrashed()->findOrFail($id);
        $employee->update($request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Employee updated successfully',
            'data' => $employee,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json([
            'status' => true,
            'message' => 'Employee deleted successfully',
        ], 200);
    }

    public function forceDelete($id)
    {

        //find employee incluing soft delete once
        $employee = Employee::withTrashed()->findOrFail($id);

        $employee->forceDelete();

        return response()->json([
            'status' => true,
            'message' => 'Employee permanently deleted',
        ], 200);
    }
}
