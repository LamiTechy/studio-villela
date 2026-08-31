# How to Restore the Full Site

The homepage is currently showing a blank black screen with the navbar hidden.

## Steps to Restore

### 1. Restore the Homepage
In `frontend/src/App.jsx`, find this line (~line 64):
```jsx
<Route path='/' element={<div className='min-h-screen bg-black' />} />
```
Change it back to:
```jsx
<Route path='/' element={<HomePage />} />
```

### 2. Restore the Navbar
In `frontend/src/App.jsx`, find this line (~line 61-62):
```jsx
<div className='relative z-50'>
    {/* <Navbar /> */}
```
Change it back to:
```jsx
<div className='relative z-50 pt-20'>
    <Navbar />
```

That's it — the site will be back to normal with the full homepage and navbar.
