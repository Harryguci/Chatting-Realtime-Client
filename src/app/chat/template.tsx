export default function Template({ children }: { children: React.ReactNode }) {
    return <div style={{ position: 'relative', height: '100%' }}>
        {/* <p>Chat template</p> */}
        {children}
    </div>
}